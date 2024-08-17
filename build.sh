#!/bin/bash

# Instalar las dependencias del proyecto
pip install -r requirements.txt

# Ejecutar migraciones de la base de datos
python manage.py migrate

# Recopilar archivos estáticos
python manage.py collectstatic --no-input
