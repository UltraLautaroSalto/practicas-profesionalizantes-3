export function messageHandler(request, response) {
    console.log("Mensaje recibido en el servidor");

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ ok: true }));
}