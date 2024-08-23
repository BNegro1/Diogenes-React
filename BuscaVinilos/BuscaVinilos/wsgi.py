import os
import sys

# Añadir la ruta correcta al sys.path
sys.path.append('/home/tuvinilos/Busca-Vinilos-Django/BuscaVinilos')

# Establecer la variable DJANGO_SETTINGS_MODULE con el path correcto
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'BuscaVinilos.settings')

# Obtener la aplicación WSGI
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
