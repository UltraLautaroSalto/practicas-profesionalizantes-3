import { hashPassword } from '../utils/crypto.mjs';

export function login(db, username, password) {

    const password_hash = hashPassword(password);

    const stmt = db.prepare(`
        SELECT * FROM user
        WHERE username = ?
        AND password_hash = ?
    `);

    const user = stmt.get(username, password_hash);

    if (!user) {
        return {
            status: false,
            description: 'INVALID_CREDENTIALS'
        };
    }

    return {
        status: true,
        user
    };
}