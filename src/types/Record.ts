export interface VinylRecord {
  id?: number;
  CODIGO: string;
  PRECIO: number;
  ARTISTA: string;
  ALBUM: string;
  ESTADO: string;
  INSERTO_POSTER: string;
  FORMATO: string;
  COMUNA: string;
  CONTACTO: string;
  created_at?: string;
}

// Tipo para los datos crudos del Excel
export type RawExcelRecord = {
  [K in keyof Omit<VinylRecord, 'id' | 'created_at'>]: string | number;
};

export interface User {
  email: string;
  isAuthenticated: boolean;
}
