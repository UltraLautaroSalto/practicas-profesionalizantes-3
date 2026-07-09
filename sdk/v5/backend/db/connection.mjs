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
    db.exec(`
    CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS role (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS permission (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS user_role (
        user_id INTEGER,
        role_id INTEGER,
        PRIMARY KEY (user_id, role_id)
    );

    CREATE TABLE IF NOT EXISTS role_permission (
        role_id INTEGER,
        permission_id INTEGER,
        PRIMARY KEY (role_id, permission_id)
    );
    `);

    // 👇 INSERT MASIVO (solo si no hay datos)
    const count = db.prepare("SELECT COUNT(*) as total FROM user").get();

    if (count.total === 0) {
        db.exec(`
        INSERT INTO role (name) VALUES ('admin'), ('user');

        INSERT INTO permission (name) VALUES
        ('CREATE_USER'),
        ('DELETE_USER'),
        ('UPDATE_USER'),
        ('VIEW_USER');

        INSERT INTO role_permission (role_id, permission_id)
        SELECT r.id, p.id
        FROM role r, permission p
        WHERE r.name = 'admin';

        INSERT INTO role_permission (role_id, permission_id)
        SELECT r.id, p.id
        FROM role r, permission p
        WHERE r.name = 'user' AND p.name = 'VIEW_USER';

        INSERT INTO user (username, password) VALUES
        ('admin', '1234'),
        ('juan', '1234'),
        ('ana', '1234'),
        ('pedro', '1234');

        INSERT INTO user_role (user_id, role_id)
        SELECT u.id, r.id FROM user u, role r
        WHERE u.username = 'admin' AND r.name = 'admin';

        INSERT INTO user_role (user_id, role_id)
        SELECT u.id, r.id FROM user u, role r
        WHERE r.name = 'user' AND u.username != 'admin';
        `);

        console.log("Base de datos inicializada con datos de prueba.");
    }
}