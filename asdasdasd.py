import pandas as pd
import random

# Generar precios en formato CLP (sin decimales, con punto como separador de miles)
precios = [f"{int(random.uniform(1000, 50000)):,}".replace(',', '.') for _ in range(5)]

# Datos ficticios para las listas faltantes
artistas = ["The Beatles", "Pink Floyd", "Led Zeppelin", "Queen", "Rolling Stones",
           "Bob Dylan", "David Bowie", "Metallica", "AC/DC", "Black Sabbath"]
albumes = ["Abbey Road", "The Wall", "IV", "A Night at the Opera", "Sticky Fingers",
          "Highway 61 Revisited", "Ziggy Stardust", "Master of Puppets", "Back in Black", "Paranoid"]

# Datos ficticios adicionales para completar el encabezado requerido
estados = ["excelente", "bueno", "regular"]
inserto_poster = ["sí", "no"]
formatos = ["Vinilo", "CD", "Cassette"]
comunas = ["LAS CONDES", "PROVIDENCIA", "MACUL", "ÑUÑOA", "SANTIAGO CENTRO"]
contactos = [
    "MELODIAS", "LA TIENDA DEL ROCK", "DISCOS ALTERNATIVOS", 
    "DISCOS IMPORTADOS", "VINILOS DEL MUNDO"
]

# Crear DataFrame con las columnas del encabezado
nuevos_datos_completos = pd.DataFrame({
    "CODIGO": [f"ART{str(i).zfill(3)}" for i in range(1, 6)],
    "PRECIO": precios,
    "ARTISTA": random.choices(artistas, k=5),
    "ALBUM": random.choices(albumes, k=5),
    "ESTADO": random.choices(estados, k=5),
    "INSERTO_POSTER": random.choices(inserto_poster, k=5),
    "FORMATO": random.choices(formatos, k=5),
    "COMUNA": random.choices(comunas, k=5),
    "CONTACTO": random.choices(contactos, k=5)
})

# Guardar en un archivo Excel
output_path_completo = 'vinilos_n.xlsx'
nuevos_datos_completos.to_excel(output_path_completo, index=False)

output_path_completo
