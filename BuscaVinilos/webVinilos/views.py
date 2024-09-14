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

    if artista and album:
        # Filtrar por el artista y el álbum específico
        resultados = Vinilo.objects.filter(artista__icontains=artista, album__icontains=album)
    elif artista:
        # Filtrar solo por el artista si no se ha especificado un álbum
        resultados = Vinilo.objects.filter(artista__icontains=artista)
    else:
        resultados = Vinilo.objects.none()

    return render(request, 'resultados.html', {'resultados': resultados, 'artista': artista, 'album': album})

def catalogo(request):
    vinilos = Vinilo.objects.all()
    return render(request, 'catalogo.html', {'vinilos': vinilos})

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

            Vinilo.objects.all().delete()

            for _, row in data.iterrows():
                Vinilo.objects.create(
                    artista=row['Artista'],
                    album=row['Album'],
                    estado=row['Estado (disco/caratula)'],
                    precio=row['Precio'],
                    comuna=row['Comuna'],
                    tienda=row['Tienda']
                )

            data = cargar_datos_bd()

            messages.success(request, "Datos actualizados correctamente.")
            return redirect('gestor')
    else:
        form = CSVUploadForm()

    return render(request, 'gestor.html', {'form': form})

def filtrar_artistas(request):
    query = request.GET.get('q', '').strip().lower()

    if query:
        artistas = Vinilo.objects.filter(artista__icontains=query).values_list('artista', flat=True).distinct()[:5]
        return JsonResponse(list(artistas), safe=False)

    return JsonResponse([], safe=False)

def filtrar_albums(request):
    album_query = request.GET.get('q', '').strip().lower()

    if album_query:
        # Buscar álbumes que contengan la query y devolverlos con el formato "Artista - Álbum"
        albums = Vinilo.objects.filter(album__icontains=album_query).values_list('artista', 'album').distinct()[:5]
        suggestions = [f"{artista} - {album}" for artista, album in albums]
        return JsonResponse(suggestions, safe=False)

    return JsonResponse([], safe=False)



def busqueda_vinilos(request):
    return render(request, 'busqueda.html')

def formatear_texto(texto):
    return texto.capitalize()

def filtrar_sugerencias(request):
    query = request.GET.get('q', '').strip().lower()
    resultados = Vinilo.objects.filter(artista__icontains=query) | Vinilo.objects.filter(album__icontains=query)
    resultados = resultados.distinct()[:5]

    sugerencias = []
    for vinilo in resultados:
        artista = formatear_texto(vinilo.artista)
        album = formatear_texto(vinilo.album)
        sugerencias.append(f"{artista} - {album}")

    return JsonResponse({
        'sugerencias': sugerencias,
        'total_resultados': resultados.count()
    })