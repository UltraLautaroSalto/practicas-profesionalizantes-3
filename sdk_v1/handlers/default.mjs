import { readFileSync } from 'node:fs';

export function defaultHandler(request, response, config) {
    try {
        const html = readFileSync(config.server.default_path, 'utf-8');

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(html);
    } catch {
        response.writeHead(500);
        response.end("Error cargando HTML");
    }
}