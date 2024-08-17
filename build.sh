#!/usr/bin/env bash
# Exit on error
set -o errexit

# Navega al directorio que contiene manage.py
cd BuscaVinilos

# Instala las dependencias
pip install -r requirements.txt

# Recoge los archivos estáticos
python manage.py collectstatic --no-input

# Aplica las migraciones pendientes de la base de datos
python manage.py migrate
