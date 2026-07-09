export function createRouter(config, handlers, db) {

    const routes = new Map();


    // ==========================================
    // Página principal
    // ==========================================

    routes.set(

        config.routes.default,

        (req, res) =>

            handlers.defaultHandler(
                req,
                res,
                config
            )

    );


    // ==========================================
    // Registro de usuarios
    // ==========================================

    routes.set(

        config.routes.register,

        (req, res) =>

            handlers.registerHandler(
                req,
                res,
                db
            )

    );


    // ==========================================
    // Login
    // ==========================================

    routes.set(

        config.routes.login,

        (req, res) =>

            handlers.loginHandler(
                req,
                res,
                db
            )

    );


    // ==========================================
    // Mostrar mensaje
    // ==========================================

    routes.set(

        config.routes.showMessage,

        (req, res) =>

            handlers.messageHandler(
                req,
                res
            )

    );


    // ==========================================
    // Roles (Grupos)
    // ==========================================

    routes.set(

        config.routes.role,

        (req, res) =>

            handlers.roleHandler(
                req,
                res,
                db
            )

    );


    // ==========================================
    // Permisos
    // ==========================================

    routes.set(

        config.routes.permission,

        (req, res) =>

            handlers.permissionHandler(
                req,
                res,
                db
            )

    );


    // ==========================================
    // Dispatcher
    // ==========================================

    return async function dispatcher(request, response) {

        const url = new URL(
            request.url,
            `http://${config.server.ip}`
        );

        const handler = routes.get(
            url.pathname
        );


        if (handler) {

            return handler(
                request,
                response
            );

        }


        response.writeHead(404);

        response.end("Ruta no encontrada");

    };

}