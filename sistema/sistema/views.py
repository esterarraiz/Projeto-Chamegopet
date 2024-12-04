from django.conf import settings
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views.generic import View
from pets.models import Pet, Perfil 
import re
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework import serializers
from rest_framework.authtoken.views import ObtainAuthToken

class Home(View):
    """Página inicial com lista de pets"""
    def get(self, request, *args, **kwargs):
        # Lista todos os pets para exibir na página inicial
        pets = Pet.objects.all()
        context = {
            'title': 'Página Inicial',
            'user': request.user,  # Passando o usuário logado
            'pets': pets,  # Passando a lista de pets para o template
        }
        return render(request, 'home.html', context)
    
    def post(self, request, *args, **kwargs):
        return redirect('/')


class Login(View):
    """Class Based View para autenticação de usuários"""
    def get(self, request):
        if request.user.is_authenticated:
            return redirect("/")  # Redireciona para a página inicial se já estiver logado
        else:
            return render(request, 'autenticacao.html', {'mensagem': ''})
    
    def post(self, request):
        if request.user.is_authenticated:
            return redirect("/")  # Redireciona para a página inicial se já estiver logado

        usuario = request.POST.get('usuario', None)
        senha = request.POST.get('senha', None)

        user = authenticate(request, username=usuario, password=senha)
        if user is not None:
            if user.is_active:
                login(request, user)
                next_url = request.GET.get('next', '/')  # Se não tiver 'next', redireciona para a home
                return redirect(next_url)  # O redirecionamento será para a página correta
            return render(request, "autenticacao.html", {'mensagem': 'Usuário Inativo.'})
        return render(request, 'autenticacao.html', {'mensagem':'Usuário ou Senha Inválidos!'})

class Logout(View):
    """Desconectar o usuário e redirecionar para a página de login"""
    def get(self, request):
        logout(request)
        messages.success(request, "Você saiu com sucesso!")
        return redirect('home') # Redireciona para a URL de login definida nas configurações

class CadastroView(View):
    """View para cadastro de novo usuário"""
    def get(self, request):
        return render(request, 'cadastro.html')

    def post(self, request):
        primeiro_nome = request.POST.get('primeiro_nome')  # Nome correto
        ultimo_nome = request.POST.get('ultimo_nome')      # Nome correto
        usuario = request.POST.get('usuario')
        email = request.POST.get('email')
        cpf = request.POST.get('cpf')
        senha = request.POST.get('senha')
        confirm_senha = request.POST.get('confirm_senha')

        # Verificar se as senhas coincidem
        if senha != confirm_senha:
            messages.error(request, "As senhas não coincidem!")
            return render(request, 'cadastro.html')

        # Verificação de CPF válido (opcional)
        if not self.validar_cpf(cpf):
            messages.error(request, "CPF inválido!")
            return render(request, 'cadastro.html')

        # Criar o usuário
        try:
            usuario_novo = User.objects.create_user(
                first_name=primeiro_nome,  # Nome do campo correto
                last_name=ultimo_nome,    # Nome do campo correto
                username=usuario,
                email=email,
                password=senha
            )
            # Criar o perfil associado
            Perfil.objects.create(usuario=usuario_novo, cpf=cpf)

            messages.success(request, "Cadastro realizado com sucesso!")
            return redirect('login')  # Redireciona para a tela de login
        except Exception as e:
            messages.error(request, f"Erro ao criar conta: {e}")
            return render(request, 'cadastro.html')

    def validar_cpf(self, cpf):
        cpf = re.sub(r'\D', '', cpf)  # Remove caracteres não numéricos
        return len(cpf) == 11

# View para divulgar um pet, apenas para usuários autenticados
@login_required
def divulgar_pet(request):
    """Página para divulgar um novo pet"""
    if request.method == 'POST':
        nome = request.POST.get('nome')
        especie = request.POST.get('especie')
        raca = request.POST.get('raca')
        idade = request.POST.get('idade')
        sexo = request.POST.get('sexo')

        # Criar um novo pet e salvar no banco
        pet = Pet(nome=nome, especie=especie, raca=raca, idade=idade, sexo=sexo, usuario=request.user)
        pet.save()

        messages.success(request, "Pet divulgado com sucesso!")
        return redirect('home')  # Redireciona para a página inicial após sucesso

    return render(request, 'divulgar_pet.html')  # Renderiza o formulário de divulgação do pet

class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'id': user.id,
            'nome': user.get_full_name(), 
            'email': user.email,
            'token': token.key
        })