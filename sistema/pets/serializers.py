from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Pet 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class PetSerializer(serializers.ModelSerializer):
    usuario = serializers.StringRelatedField(read_only=True)  # Retorna o nome do usuário no GET
    usuario_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='usuario', write_only=True
    ) 

    class Meta:
        model = Pet
        fields = [
            'id', 'titulo', 'especie', 'raca', 'idade', 'sexo', 'descricao', 
            'cep', 'cidade', 'estado', 'whatsapp', 'date_posted', 'imagem', 
            'usuario', 'usuario_id'
        ]

    def validate_usuario_id(self, value):
        if not User.objects.filter(id=value).exists():
            raise serializers.ValidationError("Usuário não encontrado.")
        return value
