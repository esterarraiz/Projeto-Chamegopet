from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Pet(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pets')
    titulo = models.CharField(max_length=100) 
    especie = models.CharField(max_length=50, choices=[
        ('cachorro', 'Cachorro'),
        ('gato', 'Gato'),
        ('outro', 'Outro'),
    ])
    raca = models.CharField(max_length=100, blank=True, null=True)  # Raça do pet
    idade = models.PositiveIntegerField(blank=True, null=True)  # Idade em anos
    sexo = models.CharField(  # Sexo do pet
        max_length=15,
        choices=[
            ('macho', 'Macho'),
            ('femea', 'Fêmea'),
            ('nao_informado', 'Não Informado'),
        ],
    )
    descricao = models.TextField()  # Descrição do pet
    cep = models.CharField(max_length=8)  # Novo campo para o CEP
    cidade = models.CharField(max_length=100, blank=True, null=True)  # Cidade
    estado = models.CharField(max_length=2, blank=True, null=True)
    whatsapp = models.CharField(max_length=15, blank=True)
    date_posted = models.DateTimeField(default=timezone.now)
    imagem = models.ImageField(upload_to='pets/img/', blank=True, null=True)  # Foto do pet

    def __str__(self):
        return self.titulo

class Perfil(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name='perfil')
    cpf = models.CharField(max_length=11, unique=True)

    def __str__(self):
        return f"{self.usuario.username} - {self.cpf}"
    

