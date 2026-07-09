import { DatabaseSync } from 'node:sqlite';
import { resolve } from 'node:path';

export function connectDB(path) {
    const dbPath = resolve(path);
    const db = new DatabaseSync(dbPath);

    initDB(db); // 👈 IMPORTANTE

    return db;
}

// Crear tabla si no existe
function initDB(db) {
    const sql = `
    CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
    );
    `;

    db.exec(sql);
}