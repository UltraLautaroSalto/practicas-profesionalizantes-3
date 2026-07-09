import { login } from '../services/authService.mjs';

async function parseBody(request) {
    return new Promise(resolve => {
        let body = "";

        request.on("data", chunk => body += chunk);

        request.on("end", () => {
            const params = new URLSearchParams(body);

            resolve({
                username: params.get("username"),
                password: params.get("password")
            });
        });
    });
}

export async function loginHandler(request, response, db) {
    const input = await parseBody(request);

    const output = login(db, input.username, input.password);

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(output));
}