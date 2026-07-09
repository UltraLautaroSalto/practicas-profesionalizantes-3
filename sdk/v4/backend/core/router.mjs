import { authorize } from './authorizer.mjs';

function jsonError(res, code, detail)
{
    res.writeHead(code, {
        'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({
        exception: 'error',
        detail
    }));
}

export function createRouter(config, handlers, db)
{
    const routes = new Map();

    routes.set('/print', handlers.printHandler);
    routes.set('/log', handlers.logHandler);
    routes.set('/help', handlers.helpHandler);
    routes.set('/sayHello', handlers.sayHelloHandler);
    routes.set('/sayBye', handlers.sayByeHandler);

    return async function dispatcher(request, response)
    {
        // 🌐 CORS + HEADERS RPC
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        response.setHeader('Access-Control-Allow-Headers',
            'Content-Type, Authorization, X-API-Version, x-user-id, x-api-key'
        );

        if (request.method === 'OPTIONS')
        {
            response.writeHead(204);
            return response.end();
        }

        const url = new URL(
            request.url,
            `http://${config.server.ip}`
        );

        const handler = routes.get(url.pathname);

        if (!handler)
        {
            return jsonError(response, 400, ['INVALID_PATH']);
        }

        if (request.method !== 'POST')
        {
            return jsonError(response, 400, ['INVALID_METHOD']);
        }

        const allowed = authorize(request);

        if (!allowed)
        {
            return jsonError(response, 401, ['UNAUTHORIZED']);
        }

        try
        {
            return await handler(request, response, db);
        }
        catch (err)
        {
            return jsonError(response, 500, [err.message]);
        }
    };
}