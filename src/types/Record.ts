export interface VinylRecord {
  CODIGO: string;
  PRECIO: number;
  ARTISTA: string;
  ALBUM: string;
  ESTADO: string;
  INSERTO_POSTER: string;
  FORMATO: string;
  COMUNA: string;
  CONTACTO: string;
}

export interface User {
  email: string;
  isAuthenticated: boolean;
}