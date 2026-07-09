import { readFileSync } from 'node:fs';

import { connectDB } from './db/connection.mjs';
import { createRouter } from './core/router.mjs';
import { startServer } from './core/server.mjs';

import { defaultHandler } from './handlers/default.mjs';
import { registerHandler } from './handlers/register.mjs';
import { loginHandler } from './handlers/login.mjs';
import { messageHandler } from './handlers/message.mjs';

// NUEVOS
import { roleHandler } from './handlers/role.mjs';
import { permissionHandler } from './handlers/permission.mjs';
import { assignRoleHandler } from './handlers/assignRole.mjs';
import { assignPermissionHandler } from './handlers/assignPermission.mjs';


// ==============================
// Cargar configuración
// ==============================

function loadConfig() {
    try {
        return JSON.parse(
            readFileSync('./config.json', 'utf-8')
        );
    }
    catch {
        throw new Error("No se pudo cargar config.json");
    }
}

const config = loadConfig();


// ==============================
// Base de datos
// ==============================

const db = connectDB(config.database.path);


// ==============================
// Handlers
// ==============================

const handlers = {

    defaultHandler,

    registerHandler,

    loginHandler,

    messageHandler,

    roleHandler,

    permissionHandler,

    assignRoleHandler,

    assignPermissionHandler

};


// ==============================
// Router
// ==============================

const dispatcher = createRouter(
    config,
    handlers,
    db
);


// ==============================
// Servidor
// ==============================

startServer(config, dispatcher);