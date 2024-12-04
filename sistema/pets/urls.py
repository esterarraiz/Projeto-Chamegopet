from django.urls import path
from .views import DivulgarView, PetDetailView, PetsListarAPI, PetDetailAPI, PetsMinhasDivulgacoesAPI, EditarDivulgacaoAPI, ExcluirDivulgacaoAPI, DivulgarPetAPI
from . import views

urlpatterns = [
    path('divulgar/', DivulgarView.as_view(), name='divulgar_pet'),
    path('<int:pk>/', PetDetailView.as_view(), name='pet_detail'),
    path('editar/<int:pet_id>/', views.editar_divulgacao, name='editar_divulgacao'),
    path('excluir/<int:pet_id>/', views.excluir_divulgacao, name='excluir_divulgacao'),
    path('minhas-divulgacoes/', views.minhas_divulgacoes, name='minhas_divulgacoes'),
    path('api/pets/', PetsListarAPI.as_view(), name='pets_listar'),
    path('api/pets/<int:pet_id>/', PetDetailAPI.as_view(), name='pet-detail'),
    path('api/minhas-divulgacoes/', PetsMinhasDivulgacoesAPI.as_view(), name='minhas_divulgacoes_api'),
    path('api/excluir-divulgacao/<int:pet_id>/', ExcluirDivulgacaoAPI.as_view(), name='excluir_divulgacao_api'),
    path('api/editar-divulgacao/<int:pet_id>/', EditarDivulgacaoAPI.as_view(), name='editar_divulgacao_api'),
     path('api/divulgar-pet/', DivulgarPetAPI.as_view(), name='divulgar_pet_api'),
]
