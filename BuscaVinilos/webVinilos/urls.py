# webVinilos/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio'),  # Página principal
    path('buscar/', views.buscar, name='buscar'),
    path('catalogo/', views.catalogo, name='catalogo'),
    path('gestor/', views.gestor, name='gestor'),
    path('filtrar-artistas/', views.filtrar_artistas, name='filtrar_artistas'),
    path('filtrar-albums/', views.filtrar_albums, name='filtrar_albums'),
    path('resultados/', views.buscar, name='resultados'),
    path('filtrar-sugerencias/', views.filtrar_sugerencias, name='filtrar_sugerencias'),
    path('busqueda/', views.busqueda_vinilos, name='busqueda_vinilos'),
    path('filtrar-sugerencias/', views.filtrar_sugerencias, name='filtrar_sugerencias'),
]
