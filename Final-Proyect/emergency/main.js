// Mostrar secciones
function mostrarRegistro() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("registro").style.display = "block";
}

function mostrarLogin() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("login").style.display = "block";
}

function volverMenu() {
    document.getElementById("menu").style.display = "block";
    document.getElementById("registro").style.display = "none";
    document.getElementById("login").style.display = "none";
}

// Registrar usuario
function registrarUsuario() {
    let usuario = document.getElementById("reg_user").value;
    let password = document.getElementById("reg_pass").value;
    let rol = document.getElementById("reg_rol").value;

    if (usuario === "" || password === "" || rol === "") {
        alert("Completa todos los campos.");
        return;
    }

    fetch("/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password, rol })
    })
    .then(res => res.text())
    .then(respuesta => {
        if (respuesta === "OK") {
            alert("Usuario registrado correctamente.");
            volverMenu();
        } else {
            alert("Error al registrar usuario: " + respuesta);
        }
    })
    .catch(err => {
        console.error(err);
        alert("Error de red al registrar usuario.");
    });
}

// Iniciar sesión
function iniciarSesion() {
    let user = document.getElementById("log_user").value;
    let pass = document.getElementById("log_pass").value;

    fetch("/usuarios.txt")
        .then(res => res.text())
        .then(data => {
            let lineas = data.split("\n");
            let encontrado = false;
            let rol = "";

            for (let linea of lineas) {
                if (!linea.trim()) continue;
                const [u, p, r] = linea.trim().split(";");
                if (u === user && p === pass) {
                    encontrado = true;
                    rol = r;
                    break;
                }
            }

            if (encontrado) {
                mostrarMenuPorRol(rol);
            } else {
                alert("Usuario o contraseña incorrectos.");
            }
        })
        .catch(err => {
            console.error(err);
            alert("Error leyendo usuarios.");
        });
}

function mostrarMenuPorRol(rol) {
    document.getElementById("menu").style.display = "none";
    document.getElementById("registro").style.display = "none";
    document.getElementById("login").style.display = "none";

    document.getElementById("menuRol").style.display = "block";

    // Mostrar título del rol
    const titulo = document.getElementById("tituloRol");
    if (rol === "admin") titulo.innerText = "Panel de Administrador";
    else if (rol === "vendedor") titulo.innerText = "Panel de Vendedor";
    else if (rol === "cliente") titulo.innerText = "Panel de Cliente";

    // Mostrar botón correspondiente
    const opciones = document.getElementById("opcionesRol");

    if (rol === "admin") {
        opciones.innerHTML = `<button onclick="abrirPantalla('admin')">Entrar al Panel Administrador</button>`;
    } 
    else if (rol === "vendedor") {
        opciones.innerHTML = `<button onclick="abrirPantalla('vendedor')">Entrar al Panel Vendedor</button>`;
    } 
    else if (rol === "cliente") {
        opciones.innerHTML = `<button onclick="abrirPantalla('cliente')">Entrar al Panel Cliente</button>`;
    }
}

function abrirPantalla(rol) {
    document.getElementById("menuRol").style.display = "none";

    document.getElementById("pantallaAdmin").style.display = "none";
    document.getElementById("pantallaVendedor").style.display = "none";
    document.getElementById("pantallaCliente").style.display = "none";

    if (rol === "vendedor") {
        mostrarPanelVendedor();
    }
    else if (rol === "admin") {
        mostrarPanelAdministrador();
    }
    else if (rol === "cliente") {
        mostrarPanelCliente();
    }
}

function volverMenuPorRol() {
    document.getElementById("contenido").innerHTML = "";
    document.getElementById("menuRol").style.display = "block";
}

function cerrarSubpantalla() {
    document.getElementById("pantallaAdmin").style.display = "none";
    document.getElementById("pantallaVendedor").style.display = "none";
    document.getElementById("pantallaCliente").style.display = "none";
    document.getElementById("menuRol").style.display = "block";
}

function cerrarSesion() {
    document.getElementById("menuRol").style.display = "none";
    volverMenu(); // vuelve al menú principal
}

function mostrarGestionProductos() {
    document.getElementById("pantallaAdmin").style.display = "none";
    document.getElementById("gestionProductos").style.display = "block";
}

function cerrarGestionProductos() {
    document.getElementById("gestionProductos").style.display = "none";
    document.getElementById("pantallaAdmin").style.display = "block";
}

function agregarProducto() {
    let nombre = document.getElementById("prod_nombre").value;
    let precio = document.getElementById("prod_precio").value;
    let stock = document.getElementById("prod_stock").value;

    if (nombre === "" || precio === "" || stock === "") {
        alert("Completa todos los campos.");
        return;
    }

    fetch("/agregarProducto", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ nombre, precio, stock })
    })
    .then(res => res.text())
    .then(resp => {
        if (resp === "OK") {
            alert("Producto agregado correctamente.");
            document.getElementById("prod_nombre").value = "";
            document.getElementById("prod_precio").value = "";
            document.getElementById("prod_stock").value = "";
        } else {
            alert("Error agregando producto: " + resp);
        }
    })
    .catch(err => {
        console.error(err);
        alert("Error de red al agregar producto.");
    });
}

function mostrarProductosAdmin() {
    cargarProductos(productos => {
        let html = "<h3>Listado de productos</h3><table border='1' cellpadding='5'>";
        html += "<tr><th>Nombre</th><th>Precio</th><th>Stock</th></tr>";

        productos.forEach(p => {
            html += `<tr><td>${p.nombre}</td><td>${p.precio}</td><td>${p.stock}</td></tr>`;
        });

        html += "</table><br><button onclick='cerrarSubpantalla()'>Volver</button>";

        document.getElementById("pantallaAdmin").innerHTML = html;
        document.getElementById("pantallaAdmin").style.display = "block";
        document.getElementById("menuRol").style.display = "none";
    });
}

function mostrarCatalogo() {
    const pantalla = document.getElementById("pantallaVendedor");

    pantalla.innerHTML = `
        <h2>Catálogo</h2>
        <div id="catalogo_lista"></div>
        <button onclick="mostrarPanelVendedor()">Volver</button>
    `;

    cargarProductos(productos => {
        let html = "<table border='1' cellpadding='5'>";
        html += "<tr><th>Nombre</th><th>Precio</th><th>Stock</th></tr>";

        productos.forEach(p => {
            html += `<tr><td>${p.nombre}</td><td>${p.precio}</td><td>${p.stock}</td></tr>`;
        });

        html += "</table>";

        document.getElementById("catalogo_lista").innerHTML = html;
    });
}

function mostrarComprar() {
    cargarProductos(productos => {
        let html = "<h3>Comprar Productos</h3><table border='1' cellpadding='5'>";
        html += "<tr><th>Nombre</th><th>Precio</th><th>Stock</th></tr>";

        productos.forEach(p => {
            html += `<tr><td>${p.nombre}</td><td>${p.precio}</td><td>${p.stock}</td></tr>`;
        });

        html += "</table><br><button onclick='cerrarSubpantalla()'>Volver</button>";

        document.getElementById("pantallaCliente").innerHTML = html;
        document.getElementById("pantallaCliente").style.display = "block";
        document.getElementById("menuRol").style.display = "none";
    });
}

function cargarProductos(callback) {
    // cargamos el archivo estático productos.txt
    fetch("/productos.txt")
        .then(res => res.text())
        .then(data => {
            let productos = [];

            if (data.trim() !== "") {
                let lineas = data.trim().split("\n");
                for (let linea of lineas) {
                    if (!linea.trim()) continue;
                    let [nombre, precio, stock] = linea.split(";");
                    productos.push({ nombre: nombre.trim(), precio: precio.trim(), stock: stock.trim() });
                }
            }

            callback(productos);
        })
        .catch(err => {
            console.error("Error cargando productos:", err);
            callback([]);
        });
}

// ---------------- VENDEDOR: registrar venta con select ----------------

function mostrarPanelVendedor() {
    document.getElementById("menuRol").style.display = "none";
    const pantalla = document.getElementById("pantallaVendedor");

    pantalla.innerHTML = `
        <h2>Panel del Vendedor</h2>
        <button onclick="mostrarRegistrarVenta()">Registrar Venta</button><br><br>
        <button onclick="mostrarCatalogo()">Ver Catálogo</button><br><br>
        <button onclick="volverMenuPorRol()">Volver</button>
    `;

    pantalla.style.display = "block";
}

function mostrarRegistrarVenta() {
    const pantalla = document.getElementById("pantallaVendedor");

    pantalla.innerHTML = `
        <h2>Registrar Venta</h2>
        <label>Producto:</label><br>
        <select id="venta_producto"></select><br><br>

        <label>Cantidad:</label><br>
        <input type="number" id="venta_cantidad" min="1"><br><br>

        <button onclick="registrarVenta()">Registrar</button>
        <button onclick="mostrarPanelVendedor()">Volver</button>

        <div id="venta_result" style="margin-top:15px;"></div>
    `;

    const select = document.getElementById("venta_producto");

    cargarProductos(productos => {
        select.innerHTML = "";

        productos.forEach(p => {
            const opt = document.createElement("option");
            opt.value = p.nombre;
            opt.textContent = `${p.nombre} (stock: ${p.stock}) — $${p.precio}`;
            select.appendChild(opt);
        });
    });
}

function registrarVenta() {
    const select = document.getElementById("venta_producto");
    const cantidadInput = document.getElementById("venta_cantidad");
    const producto = select.value;
    const cantidad = parseInt(cantidadInput.value, 10);

    if (!producto) {
        alert("Seleccioná un producto.");
        return;
    }
    if (!cantidad || cantidad <= 0) {
        alert("Ingresá una cantidad válida (entera y mayor que 0).");
        return;
    }

    // Llamamos al endpoint que actualiza el stock
    fetch("/actualizarStock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: producto, cantidad: cantidad })
    })
    .then(res => res.text().then(text => ({ status: res.status, text })))
    .then(({ status, text }) => {
        if (status === 200 && text === "OK") {
            document.getElementById("venta_result").style.color = "green";
            document.getElementById("venta_result").innerText = "Venta registrada correctamente.";
            // refrescar el select para mostrar nuevo stock
            mostrarRegistrarVenta();
        } else {
            document.getElementById("venta_result").style.color = "red";
            document.getElementById("venta_result").innerText = "Error al registrar venta: " + text;
            console.warn("ActualizarStock devolvió:", status, text);
        }
    })
    .catch(err => {
        console.error(err);
        alert("Error de red al registrar venta.");
    });
}

function cerrarRegistrarVenta() {
    document.getElementById("registrarVenta").style.display = "none";
    mostrarPanelVendedor();
}

// Salir
function salir() {
    alert("Gracias por usar el sistema.");
    window.close();
}