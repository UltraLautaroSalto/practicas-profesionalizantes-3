import { authorize } from './authorizer.mjs';

export function createRouter(config, handlers, db) {

    const routes = new Map();

    routes.set('/print', handlers.printHandler);
    routes.set('/log', handlers.logHandler);
    routes.set('/help', handlers.helpHandler);

    routes.set('/sayHello', handlers.sayHelloHandler);
    routes.set('/sayBye', handlers.sayByeHandler);

    return async function dispatcher(request, response) {

        const url = new URL(
            request.url,
            `http://${config.server.ip}`
        );

        const handler = routes.get(url.pathname);

        if (!handler) {

            response.writeHead(404);

            return response.end('NOT_FOUND');
        }

        // 🔐 AUTORIZACIÓN
        const allowed = authorize(request);

        if (!allowed) {

            response.writeHead(403);

            return response.end('ACCESS_DENIED');
        }

        return handler(request, response, db);
    };
}