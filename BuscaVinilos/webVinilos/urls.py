from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('resultados/', views.buscar, name='resultados'),
    path('catalogo/', views.catalogo, name='catalogo'),
    path('gestor/', views.gestor, name='gestor'),
    path('filtrar-artistas/', views.filtrar_artistas, name='filtrar_artistas'),
]
