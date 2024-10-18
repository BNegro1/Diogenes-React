import os
import sys

from django.core.wsgi import get_wsgi_application

# Añadir la ruta correcta al sys.path, basada en la estructura del proyecto
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))  # Asegúrate de que esta ruta sea correcta

# Establecer la variable DJANGO_SETTINGS_MODULE con el path correcto
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'BuscaVinilos.settings')

# Obtener la aplicación WSGI
application = get_wsgi_application()
