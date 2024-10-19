import os
import sys

# Añadir la ruta correcta al sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), 'BuscaVinilos'))

# Establecer la variable DJANGO_SETTINGS_MODULE con el path correcto
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'BuscaVinilos.settings')

# Obtener la aplicación WSGI
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()