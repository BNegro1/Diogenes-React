from django.contrib import admin
from .models import Vinilo

@admin.register(Vinilo)
class ViniloAdmin(admin.ModelAdmin):
    list_display = ('codigo', 'artista', 'album', 'estado', 'inserto', 'formato', 'precio', 'comuna', 'contacto', 'tienda')
    search_fields = ('artista', 'album')
