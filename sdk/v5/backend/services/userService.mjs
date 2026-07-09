import { hashPassword } from '../utils/crypto.mjs';

export function createUser(db, username, password) {

    // ⚠ password plano NO se guarda más
    const password_hash = hashPassword(password);

    const stmt = db.prepare(`
        INSERT INTO user (username, password_hash)
        VALUES (?, ?)
    `);

    const result = stmt.run(username, password_hash);

    return {
        id: result.lastInsertRowid,
        username
    };
}