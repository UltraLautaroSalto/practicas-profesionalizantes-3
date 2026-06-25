import { createUser } from '../services/userService.mjs';

// Leer body (IMPORTANTE en Node puro)
async function parseBody(request) {
    return new Promise((resolve) => {
        let body = '';

        request.on('data', chunk => {
            body += chunk.toString();
        });

        request.on('end', () => {
            const params = new URLSearchParams(body);

            resolve({
                username: params.get('username'),
                password: params.get('password')
            });
        });
    });
}

export async function registerHandler(request, response, db) {
    try {
        const input = await parseBody(request);

        const output = createUser(db, input.username, input.password);

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(output));
    } catch (err) {
        response.writeHead(500);
        response.end(JSON.stringify({ error: err.message }));
    }
}