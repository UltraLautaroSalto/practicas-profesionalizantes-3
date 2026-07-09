import { login } from '../services/authService.mjs';
import { createSession } from '../core/sessionManager.mjs';

async function parseBody(request)
{
    return new Promise(resolve =>
    {
        let body = '';

        request.on('data', c => body += c);

        request.on('end', () =>
        {
            resolve(JSON.parse(body || '{}'));
        });
    });
}

export async function loginHandler(request, response, db)
{
    const input = await parseBody(request);

    const auth = login(db, input.username, input.password);

    if (!auth.status)
    {
        response.writeHead(401, {
            'Content-Type': 'application/json'
        });

        return response.end(JSON.stringify({
            exception: 'INVALID_CREDENTIALS',
            detail: ['username/password']
        }));
    }

    const token = createSession(auth.user);

    response.writeHead(200, {
        'Content-Type': 'application/json'
    });

    return response.end(JSON.stringify({
        token
    }));
}