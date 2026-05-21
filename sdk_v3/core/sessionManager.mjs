import crypto from 'node:crypto';

const sessions = new Map();

export function createSession(user) {

    const token = crypto.randomUUID();

    sessions.set(token, {
        user_id: user.id,
        username: user.username,
        created_at: Date.now()
    });

    return token;
}

export function getSession(token) {
    return sessions.get(token);
}

export function destroySession(token) {
    sessions.delete(token);
}