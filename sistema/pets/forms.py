from django import forms
from .models import Pet

class FormularioPet(forms.ModelForm):
    class Meta:
        model = Pet
        fields = ['titulo', 'especie', 'raca', 'idade', 'sexo', 'imagem', 'cep', 'cidade', 'estado', 'descricao', 'whatsapp']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['cep'].widget.attrs.update({'placeholder': 'Digite o CEP', 'id': 'id_cep'})
        self.fields['cidade'].widget.attrs.update({'id': 'id_cidade', 'readonly': 'readonly'})  # Você pode remover o readonly se o CEP preencher automaticamente
        self.fields['estado'].widget.attrs.update({'id': 'id_estado', 'readonly': 'readonly'})
        # Outros ajustes nos campos
        self.fields['whatsapp'].widget.attrs.update({'placeholder': 'Digite o número com DDD'})
