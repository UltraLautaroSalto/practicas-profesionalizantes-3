export function createRouter(config, handlers, db) {
    const routes = new Map();

    routes.set(config.routes.default, (req, res) =>
        handlers.defaultHandler(req, res, config)
    );

    routes.set(config.routes.register, (req, res) =>
        handlers.registerHandler(req, res, db)
    );

    routes.set(config.routes.showMessage, handlers.messageHandler);

    return async function dispatcher(request, response) {
        const url = new URL(request.url, `http://${config.server.ip}`);
        const handler = routes.get(url.pathname);

        if (handler) {
            return handler(request, response);
        }

        response.writeHead(404);
        response.end("Ruta no encontrada");
    };
}