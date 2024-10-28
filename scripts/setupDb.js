import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '..', 'data', 'records.db');

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo TEXT NOT NULL,
    precio REAL NOT NULL,
    artista TEXT NOT NULL,
    album TEXT NOT NULL,
    estado TEXT NOT NULL,
    inserto_poster TEXT,
    formato TEXT NOT NULL,
    comuna TEXT NOT NULL,
    contacto TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_artista ON records(artista);
  CREATE INDEX IF NOT EXISTS idx_album ON records(album);
`);

console.log('Database setup completed successfully!');
db.close();