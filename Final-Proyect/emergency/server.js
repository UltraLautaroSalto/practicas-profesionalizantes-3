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
    if (!nombre || !precio || !stock) {
        return res.status(400).send("Faltan datos");
    }
    const linea = `${nombre};${precio};${stock}\n`;

    fs.appendFile("productos.txt", linea, (err) => {
        if (err) {
            console.error("Error agregando producto:", err);
            return res.status(500).send("Error");
        }
        res.send("OK");
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

app.listen(3000, () => console.log("Servidor iniciado en http://localhost:3000"));