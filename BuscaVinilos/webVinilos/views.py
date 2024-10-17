from django.core.paginator import Paginator
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib import messages
from .models import Vinilo
from .forms import CSVUploadForm
import pandas as pd

def cargar_datos_bd():
    data = pd.DataFrame(list(Vinilo.objects.all().values()))
    return data

def inicio(request):
    return render(request, 'busqueda.html')

def buscar(request):
    artista = request.GET.get('artista', '').strip()
    album = request.GET.get('album', '').strip()
    items_per_page = request.GET.get('items_per_page', 10)

    if artista and album:
        # Filtrar por el artista y el álbum específico
        resultados = Vinilo.objects.filter(artista__icontains=artista, album__icontains=album)
    elif artista:
        # Filtrar solo por el artista si no se ha especificado un álbum
        resultados = Vinilo.objects.filter(artista__icontains=artista)
    elif album:
        # Filtrar solo por el álbum si no se ha especificado un artista
        resultados = Vinilo.objects.filter(album__icontains=album)
    else:
        resultados = Vinilo.objects.none()

    paginator = Paginator(resultados, items_per_page)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'resultados.html', {
        'page_obj': page_obj,
        'artista': artista,
        'album': album,
        'items_per_page': items_per_page
    })

def catalogo(request):
    vinilos = Vinilo.objects.all()
    items_per_page = request.GET.get('items_per_page', 10)
    paginator = Paginator(vinilos, items_per_page)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, 'catalogo.html', {'page_obj': page_obj, 'items_per_page': items_per_page})
def gestor(request):
    data = cargar_datos_bd()

    if request.method == "POST":
        if request.POST.get('action') == 'borrar':
            Vinilo.objects.all().delete()
            data = pd.DataFrame()  # Deja la variable `data` vacía porque no hay más registros
            messages.success(request, "El catálogo ha sido borrado correctamente.")
            return redirect('gestor')

        form = CSVUploadForm(request.POST, request.FILES)
        if form.is_valid():
            archivo_csv = request.FILES['archivo_csv']
            data = pd.read_csv(archivo_csv)

            # Verificar que las columnas necesarias están presentes en el archivo CSV
            required_columns = ['codigo', 'artista', 'album', 'estado', 'inserto', 'formato', 'precio', 'comuna', 'contacto', 'tienda']
            for column in required_columns:
                if column not in data.columns:
                    messages.error(request, f"Falta la columna requerida: {column}")
                    return redirect('gestor')

            Vinilo.objects.all().delete()

            for _, row in data.iterrows():
                Vinilo.objects.create(
                    artista=row['artista'],
                    album=row['album'],
                    estado=row['estado'],
                    inserto=row['inserto'],
                    formato=row['formato'],
                    precio=row['precio'],
                    comuna=row['comuna'],
                    contacto=row['contacto'],
                    tienda=row['tienda']
                )

            data = cargar_datos_bd()

            messages.success(request, "Datos actualizados correctamente.")
            return redirect('gestor')
    else:
        form = CSVUploadForm()

    return render(request, 'gestor.html', {'form': form})