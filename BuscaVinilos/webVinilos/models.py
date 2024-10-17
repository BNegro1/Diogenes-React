from django.db import models

class Vinilo(models.Model):
    codigo = models.CharField(max_length=100, unique=True, default='')  # Código único para cada vinilo
    artista = models.CharField(max_length=255)
    album = models.CharField(max_length=255)
    estado = models.CharField(max_length=50)  # Estado disco/caratula
    inserto = models.CharField(max_length=255, blank=True, null=True)  # Poster o inserto opcional
    formato = models.CharField(max_length=50, choices=[('Vinilo', 'Vinilo'), ('Cassette', 'Cassette'), ('CD', 'CD')], default='Vinilo')  # Formato con valor predeterminado
    precio = models.DecimalField(max_digits=40, decimal_places=2)
    comuna = models.CharField(max_length=100)
    contacto = models.URLField(max_length=200, blank=True, null=True)  # Link de contacto opcional
    tienda = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.codigo} - {self.artista} - {self.album}"