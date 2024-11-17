import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '..', 'data', 'records.db');

function setupDatabase() {
  try {
    const db = new Database(dbPath);

    // Habilitar WAL mode para mejor rendimiento
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');

    db.exec(`
      CREATE TABLE IF NOT EXISTS records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        CODIGO TEXT NOT NULL,
        PRECIO REAL NOT NULL,
        ARTISTA TEXT NOT NULL,
        ALBUM TEXT NOT NULL,
        ESTADO TEXT NOT NULL,
        INSERTO_POSTER TEXT,
        FORMATO TEXT NOT NULL,
        COMUNA TEXT NOT NULL,
        CONTACTO TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- Índices para mejorar el rendimiento de búsquedas
      CREATE INDEX IF NOT EXISTS idx_artista ON records(ARTISTA);
      CREATE INDEX IF NOT EXISTS idx_album ON records(ALBUM);
      CREATE INDEX IF NOT EXISTS idx_created_at ON records(created_at);
    `);

    console.log('¡Configuración de la base de datos completada exitosamente!');
    db.close();
  } catch (error) {
    console.error('Error al configurar la base de datos:', error);
    process.exit(1);
  }
}

setupDatabase();