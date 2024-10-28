import Database from 'better-sqlite3';
import { VinylRecord } from '../types/Record';

const db = new Database('data/records.db');

export const insertRecords = (records: VinylRecord[]) => {
    const insert = db.prepare(`
    INSERT INTO records (
      codigo, precio, artista, album, estado,
      inserto_poster, formato, comuna, contacto
    ) VALUES (
      @CODIGO, @PRECIO, @ARTISTA, @ALBUM, @ESTADO,
      @INSERTO_POSTER, @FORMATO, @COMUNA, @CONTACTO
    )
  `);

    const insertMany = db.transaction((records) => {
        for (const record of records) {
            insert.run(record);
        }
    });

    insertMany(records);
};

export const searchRecords = (artist: string = '', album: string = '') => {
    const query = db.prepare(`
    SELECT * FROM records
    WHERE (@artist = '' OR artista LIKE '%' || @artist || '%')
    AND (@album = '' OR album LIKE '%' || @album || '%')
    ORDER BY created_at DESC
  `);

    return query.all({ artist, album }) as VinylRecord[];
};

export const getAllRecords = () => {
    const query = db.prepare('SELECT * FROM records ORDER BY created_at DESC');
    return query.all() as VinylRecord[];
}; 