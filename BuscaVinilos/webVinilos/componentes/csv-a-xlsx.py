import csv
from openpyxl import Workbook

# Crear un nuevo libro de trabajo de Excel
wb = Workbook()
ws = wb.active

# Leer el archivo CSV y escribir en el archivo Excel
with open('input.csv', 'r', encoding='utf-8') as f:
    csv_reader = csv.reader(f)
    for row in csv_reader:
        ws.append(row)

# Guardar el archivo Excel
wb.save('Archivo.xlsx')

print("Conversión completada. El archivo 'output.xlsx' ha sido creado.")