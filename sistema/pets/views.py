from django.views.generic import DetailView
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from pets.forms import FormularioPet
from django.urls import reverse_lazy
from django.views.generic import CreateView
from .models import Pet
from .serializers import PetSerializer
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny



@method_decorator(login_required(login_url='/login/'), name='dispatch')
class DivulgarView(CreateView):
    model = Pet
    form_class = FormularioPet
    template_name = 'chamegopet/divulgar_pet.html'
    success_url = reverse_lazy('home')  

    def form_valid(self, form):
        """Método chamado quando o formulário é válido"""
        pet = form.save(commit=False)
        pet.usuario = self.request.user  
        pet.save()
        messages.success(self.request, "Pet divulgado com sucesso!") 
        return super().form_valid(form)



@method_decorator(login_required(login_url='/login/'), name='dispatch')
class PetDetailView(DetailView):
    model = Pet
    template_name = 'chamegopet/pet_detail.html'
    context_object_name = 'petdetail'

@login_required
def minhas_divulgacoes(request):
    pets = Pet.objects.filter(usuario=request.user)  
    return render(request, 'chamegopet/meus_posts.html', {'pets': pets})

@login_required
def excluir_divulgacao(request, pet_id):  
    pet = get_object_or_404(Pet, id=pet_id, usuario=request.user) 
    
    if request.method == 'POST':
        pet.delete()  # Exclui o pet
        messages.success(request, "Pet excluído com sucesso!")  
        return redirect('minhas_divulgacoes')  

    return render(request, 'chamegopet/excluir.html', {'pet': pet})

@login_required
def editar_divulgacao(request, pet_id): 
    pet = get_object_or_404(Pet, id=pet_id, usuario=request.user)
    
    if request.method == 'POST':
        form = FormularioPet(request.POST, request.FILES, instance=pet)
        if form.is_valid():
            form.save()
            messages.success(request, "Divulgação atualizada com sucesso!")
            return redirect('minhas_divulgacoes')
    else:
        form = FormularioPet(instance=pet)
    
    return render(request, 'chamegopet/editar.html', {'form': form})

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class PetsListarAPI(APIView):
    permission_classes = [AllowAny] 
    pagination_class = StandardResultsSetPagination  

    def get(self, request):
        pets = Pet.objects.all()
        paginator = StandardResultsSetPagination()
        result_page = paginator.paginate_queryset(pets, request)
        serializer = PetSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

class PetDetailAPI(APIView):
    """
    API para buscar os detalhes de um pet específico.
    """
    def get(self, request, pet_id):
        try:
            pet = Pet.objects.get(id=pet_id)
            serializer = PetSerializer(pet)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Pet.DoesNotExist:
            return Response({"error": "Pet não encontrado."}, status=status.HTTP_404_NOT_FOUND)

class PetsMinhasDivulgacoesAPI(APIView):
    """
    API para listar os pets do usuário logado (Minhas Divulgações).
    """
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination  

    def get(self, request):
        pets = Pet.objects.filter(usuario=request.user)
        print(f'Pets encontrados para o usuário {request.user}: {pets}')  # Log para depuração

        if not pets.exists():
            return Response({"message": "Nenhuma divulgação encontrada."}, status=status.HTTP_404_NOT_FOUND)

        paginator = StandardResultsSetPagination()
        result_page = paginator.paginate_queryset(pets, request)
        serializer = PetSerializer(result_page, many=True)
        
        return paginator.get_paginated_response(serializer.data)



class ExcluirDivulgacaoAPI(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pet_id):
        try:
            pet = Pet.objects.get(id=pet_id, usuario=request.user)
            pet.delete()
            return Response({"message": "Pet excluído com sucesso!"}, status=status.HTTP_200_OK)
        except Pet.DoesNotExist:
            return Response(
                {"error": "Pet não encontrado ou você não tem permissão para excluí-lo."},
                status=status.HTTP_404_NOT_FOUND,
            )

class EditarDivulgacaoAPI(APIView):
    """
    API para editar uma divulgação de pet.
    A edição só é permitida para o usuário que criou a divulgação.
    """
    permission_classes = [IsAuthenticated] 

    def put(self, request, pet_id):
        try:
            pet = Pet.objects.get(id=pet_id, usuario=request.user)

            serializer = PetSerializer(pet, data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Pet.DoesNotExist:
            return Response({"error": "Pet não encontrado ou você não tem permissão para editar este pet."}, 
                            status=status.HTTP_404_NOT_FOUND)

class DivulgarPetAPI(APIView):
    """
    API para criar uma nova divulgação de pet.
    Somente usuários autenticados podem criar uma nova divulgação.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        
        data = request.data.copy()  
        data['usuario'] = request.user.id  

        serializer = PetSerializer(data=data)

        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)