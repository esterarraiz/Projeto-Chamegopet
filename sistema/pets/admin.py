from django.contrib import admin
from .models import Pet

class PetAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'sexo', 'especie', 'raca', 'idade')  # Campos que você quer exibir
    search_fields = ('titulo', 'sexo')  # Permite buscar pelos campos 'name' e 'sexo'
    list_filter = ('sexo', 'especie', 'raca')  # Permite filtrar pelos campos 'sexo' e 'tipo'

# Registre o modelo com a configuração personalizada
admin.site.register(Pet, PetAdmin)


