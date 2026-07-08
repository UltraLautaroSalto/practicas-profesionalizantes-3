import { createServer } from 'node:http';

export function startServer(config, dispatcher) {
    const server = createServer(dispatcher);

    server.listen(config.server.port, config.server.ip, () => {
        console.log(`Servidor en http://${config.server.ip}:${config.server.port}`);
    });
}