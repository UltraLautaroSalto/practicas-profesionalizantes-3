import { login } from '../services/authService.mjs';
import { createSession } from '../core/sessionManager.mjs';

async function parseBody(request) {

    return new Promise(resolve => {

        let body = '';

        request.on('data', chunk => {
            body += chunk;
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

export async function loginHandler(request, response, db) {

    const input = await parseBody(request);

    const auth = login(db, input.username, input.password);

    if (!auth.status) {

        response.writeHead(401);

        return response.end(JSON.stringify(auth));
    }

    // Crear sesión
    const token = createSession(auth.user);

    response.writeHead(200, {
        'Content-Type': 'application/json'
    });

    response.end(JSON.stringify({
        status: true,
        token
    }));
}