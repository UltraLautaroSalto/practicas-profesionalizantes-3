const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.static(".")); // Para servir index.html y archivos estáticos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Leer usuarios (archivo usuarios.txt)
app.get("/usuarios", (req, res) => {
    fs.readFile("usuarios.txt", "utf8", (err, data) => {
        if (err) {
            console.error("Error leyendo usuarios:", err);
            return res.send("");
        }
        res.send(data);
    });
});

// Registrar usuario
app.post("/registrar", (req, res) => {
    const { usuario, password, rol } = req.body;
    if (!usuario || !password || !rol) {
        return res.status(400).send("Faltan datos");
    }
    const linea = `${usuario};${password};${rol}\n`;

    fs.appendFile("usuarios.txt", linea, (err) => {
        if (err) {
            console.error("Error guardando usuario:", err);
            return res.status(500).send("Error");
        }
        res.send("OK");
    });
});

// Obtener lista de productos (devuelve contenido bruto de productos.txt)
app.get("/productos", (req, res) => {
    fs.readFile("productos.txt", "utf8", (err, data) => {
        if (err) {
            console.error("Error leyendo productos:", err);
            return res.send("");
        }
        res.send(data);
    });
});

// Agregar producto (solo Admin)
app.post("/agregarProducto", (req, res) => {
    const { nombre, precio, stock } = req.body;
    const linea = `${nombre};${precio};${stock}`;

    fs.readFile("productos.txt", "utf8", (err, data) => {
        if (err) {
            if (err.code === "ENOENT") {
                fs.writeFile("productos.txt", linea + "\n", (err2) => {
                    if (err2) return res.status(500).send("Error");
                    return res.send("OK");
                });
            } else {
                return res.status(500).send("Error");
            }
            return;
        }

        const needsPrefix = data.length > 0 && !data.endsWith("\n");
        const toAppend = (needsPrefix ? "\n" : "") + linea + "\n";

        fs.appendFile("productos.txt", toAppend, (err2) => {
            if (err2) return res.status(500).send("Error");
            res.send("OK");
        });
    });
});

// Actualizar stock luego de venta
app.post("/actualizarStock", (req, res) => {
    const { nombre, cantidad } = req.body;

    if (!nombre || typeof cantidad === "undefined") {
        return res.status(400).send("Faltan datos");
    }

    fs.readFile("productos.txt", "utf8", (err, data) => {
        if (err) {
            console.error("Error leyendo productos para actualizar stock:", err);
            return res.status(500).send("Error leyendo productos");
        }

        // Si el archivo está vacío
        if (!data.trim()) {
            return res.status(400).send("No hay productos");
        }

        let lineas = data.trim().split("\n");
        let nuevas = [];
        let encontrado = false;

        for (let linea of lineas) {
            if (!linea.trim()) continue;
            let partes = linea.split(";");
            // protegerse de líneas mal formateadas
            if (partes.length < 3) {
                nuevas.push(linea);
                continue;
            }
            let n = partes[0].trim();
            let p = partes[1].trim();
            let s = parseInt(partes[2].trim(), 10);
            if (n === nombre) {
                encontrado = true;
                let nuevoStock = s - parseInt(cantidad, 10);
                if (isNaN(nuevoStock)) {
                    return res.status(400).send("Cantidad inválida");
                }
                if (nuevoStock < 0) nuevoStock = 0; // no dejamos negativo
                s = nuevoStock;
            }
            nuevas.push(`${n};${p};${s}`);
        }

        if (!encontrado) {
            return res.status(404).send("Producto no encontrado");
        }

        fs.writeFile("productos.txt", nuevas.join("\n") + "\n", (err) => {
            if (err) {
                console.error("Error escribiendo productos:", err);
                return res.status(500).send("Error al guardar productos");
            }
            res.send("OK");
        });
    });
});

// Registrar una compra en el historial
app.post("/registrarCompra", (req, res) => {
    const { usuario, producto, cantidad } = req.body;

    if (!usuario || !producto || !cantidad) {
        return res.status(400).send("Faltan datos (usuario/producto/cantidad).");
    }

    const fecha = new Date().toLocaleString("es-AR");
    const linea = `${usuario};${producto};${cantidad};${fecha}\n`;

    fs.appendFile("historial.txt", linea, (err) => {
        if (err) {
            console.error("Error al escribir historial:", err);
            return res.status(500).send("Error al registrar compra");
        }
        res.send("OK");
    });
});

// Eliminar producto
app.post("/eliminarProducto", (req, res) => {
    const { nombre } = req.body;

    fs.readFile("productos.txt", "utf8", (err, data) => {
        if (err) return res.status(500).send("Error leyendo archivo");

        const nuevas = data.split("\n").filter(l => {
            const [n] = l.split(";");
            return n && n.trim() !== nombre;
        });

        fs.writeFile("productos.txt", nuevas.join("\n"), err2 => {
            if (err2) return res.status(500).send("Error guardando archivo");
            res.send("OK");
        });
    });
});

// Modificar producto
app.post("/modificarProducto", (req, res) => {
    const { nombre, precio, stock } = req.body;

    fs.readFile("productos.txt", "utf8", (err, data) => {
        if (err) return res.status(500).send("Error leyendo archivo");

        let lineas = data.trim().split("\n").map(linea => {
            const [n, p, s] = linea.split(";");
            if (n === nombre) return `${n};${precio};${stock}`;
            return linea;
        });

        fs.writeFile("productos.txt", lineas.join("\n") + "\n", err2 => {
            if (err2) return res.status(500).send("Error guardando cambios");
            res.send("OK");
        });
    });
});


// Obtener historial de compras (todo el archivo)
app.get("/historial", (req, res) => {
    fs.readFile("historial.txt", "utf8", (err, data) => {
        if (err) return res.send("");
        res.send(data);
    });
});

app.listen(3000, () => console.log("Servidor iniciado en http://localhost:3000"));