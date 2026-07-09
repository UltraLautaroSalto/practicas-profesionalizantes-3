import { readFileSync } from 'node:fs';

import { connectDB } from './db/connection.mjs';
import { createRouter } from './core/router.mjs';
import { startServer } from './core/server.mjs';

import { defaultHandler } from './handlers/default.mjs';
import { registerHandler } from './handlers/register.mjs';
import { messageHandler } from './handlers/message.mjs';

// Cargar config
function loadConfig() {
    try {
        return JSON.parse(readFileSync('./config.json', 'utf-8'));
    } catch {
        throw new Error("No se pudo cargar config.json");
    }
}

const config = loadConfig();

// DB
const db = connectDB(config.database.path);

// Handlers agrupados
const handlers = {
    defaultHandler,
    registerHandler,
    messageHandler
};

// Router
const dispatcher = createRouter(config, handlers, db);

// Server
startServer(config, dispatcher);