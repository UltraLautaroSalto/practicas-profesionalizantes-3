let productos = [
    {nombre: "Vidrio", stock: "50", precio: "1500", peso: "Kg" , owned: "0"},
    {nombre: "Hierro", stock: "459", precio: "2500", peso: "Kg" , owned: "0"},
    {nombre: "Aluminio", stock : "238", precio: "2000", peso: "Kg", owned: "0"},
    {nombre: "Cobre", stock: "154", precio: "3500", peso: "Kg", owned: "0"},
    {nombre: "Bronce", stock: "375", precio: "5000", peso: "Kg", owned: "0"},
    {nombre: "Carton", stock: "200", precio: "500", peso: "Kg", owned: "0"},
    {nombre: "Papel", stock: "184", precio: "250", peso: "Kg", owned: "0"},
    {nombre: "TapasDePlastico", stock: "427", precio: "750", peso: "Kg", owned: "0"},
    {nombre: "Aceite", stock: "900", precio: "1250", peso: "M^3", owned: "0"},
    {nombre: "Baterias", stock: "45", precio: "4000", peso: "Unidad Unica", owned: "0"}
];

const table = document.getElementById("table");
const PrincipalMenu = document.getElementById("PrincipalMenu"); // Constantes para Ocultar
const MostrarStock = document.getElementById("Stock"); // Constante para Ocultar la Seccion de "Mostrar Productos"
const MostrarCompras = document.getElementById("Compras"); // Constante para Ocultar la Seccion de "Comprar Producto"
const MostrarVentas = document.getElementById("Vender"); // Constante para Ocultar la Seccion de "Vender Producto"

const ButtonMostrarStock = document.getElementById("PMOption1"); // Constante del Boton para ver la Seccion de "Stock"
const ButtonMostrarCompras = document.getElementById("PMOption2"); // Constante del Boton para ver la Seccion de "Compras"
const ButtonMostrarVenta = document.getElementById("PMOption3"); // Constante del Boton para ver la Seccion de "Venta"
const ButtonAddProducto = document.getElementById("AddProducto"); // Constante del Boton para ver la Seccion de "Añadir"

const SelectBuyProducto = document.getElementById("ProductoComprar"); // Constante del Producto Seleccionado a Comprar
const CantidadBuyProducto = document.getElementById("CantidadAComprar"); // Constante de la Cantidad de Producto a Comprar
const ButtonComprarProducto = document.getElementById("ComprarProducto"); // Costante del Boton para Comprar Productos
const MensajeCompra = document.getElementById("MensajeCompra"); // Constante que se ocupa del mensaje que sale cuando Compras Algo

const SelectSellProducto = document.getElementById("ProductoVender"); // Constante del Producto Seleccionado a Vender
const CantidadSellProducto = document.getElementById("CantidadAVender"); // Costante de la Cantidad de Producto a Vender
const ButtonVenderProducto = document.getElementById("VenderProducto"); // Constante del Boton para Vender Productos
const MensajeVenta = document.getElementById("MensajeVenta");  // Constante que se ocupa del mensaje que sale cuando Vendes Algo

const ButtonVolver = document.querySelectorAll(".OptionBack");

/////////////////////////////////// Funciones Principales ///////////////////////////////////////
// Funcion para ocultar las cosas
function OcultarTodo() {
    PrincipalMenu.classList.add("oculto");
    MostrarStock.classList.add("oculto");
    MostrarCompras.classList.add("oculto");
    MostrarVentas.classList.add("oculto");
}

// Funcion para Solo mostrar lo importante del momento
function MostrarSeccion(section){
    OcultarTodo();
    section.classList.remove("oculto");
}
/////////////////////////////////// Funciones Principales ///////////////////////////////////////

/////////////////////////////////// Funciones Bottones ///////////////////////////////////////
// Mostrar la Tabla de Stock de los Productos
ButtonMostrarStock.addEventListener("click", () => {
    PrincipalMenu.classList.add("oculto");
    MostrarStock.classList.remove("oculto");
});

// Tabla con los Precios y Stock's de los Productos
function RenderizarTabla() {
table.innerHTML = `
    <tr>
        <td>Producto</td>
        <td>Stock</td>
        <td>Precio</td>
        <td>Peso</td>
    </tr>
    `;

    productos.forEach(productos => {
        table.innerHTML += `
            <tr>
                <td>${productos.nombre}</td>
                <td>${productos.stock}</td>
                <td>$${productos.precio}</td>
                <td>${productos.peso}</td>
            </tr>
        `;
    });
}

// Mostrar la Lista de Compra de Productos
ButtonMostrarCompras.addEventListener("click", () => {
    RenderizarTabla();
    PrincipalMenu.classList.add("oculto");
    MostrarCompras.classList.remove("oculto");
});

// Comprar un Producto, calcular el precio total y restar lo comprado del Stock total
ButtonComprarProducto.addEventListener("click", () => {
    const productoSeleccionado = SelectBuyProducto.value;
    const cantidad = Number(CantidadBuyProducto.value);

    if (cantidad <= 0 || isNaN(cantidad)) {
        alert("Ingresá una cantidad válida.");
        return;
    }

    const producto = productos.find(p => p.nombre === productoSeleccionado);

    if (!producto) {
        alert("Producto inválido.");
        return;
    }

    if (cantidad > producto.stock) {
        alert(`No hay suficiente stock. Disponible: ${producto.stock} ${producto.peso}`);
        return;
    }

    producto.stock -= cantidad;
    producto.owned += cantidad;

    const total = cantidad * producto.precio;

    MensajeCompra.textContent = `Compra realizada: ${cantidad} ${producto.peso} de ${producto.nombre}. Total: $${total}`;

    RenderizarTabla();
});

function actualizarSelectProductos() {
    SelectBuyProducto.innerHTML = "";

    productos.forEach(productos => {
        SelectBuyProducto.innerHTML += `
            <option value="${productos.nombre}">${productos.nombre}</option>
        `;
    });
}

// Añadir Producto
ButtonAddProducto.addEventListener("click", () => {
    const nombre = prompt("Ingrese el nombre del producto:");
    if (!nombre || nombre.trim() === "") {
        alert("Nombre inválido.");
        return;
    }

    const stock = Number(prompt("Ingrese la cantidad de stock:"));
    if (isNaN(stock) || stock < 0) {
        alert("Stock inválido.");
        return;
    }

    const precio = Number(prompt("Ingrese el precio del producto:"));
    if (isNaN(precio) || precio < 0) {
        alert("Precio inválido.");
        return;
    }

    const peso = prompt("Ingrese la unidad de medida (Kg, M^3, Unidad, etc):");
    if (!peso || peso.trim() === "") {
        alert("Unidad de Peso inválida.");
        return;
    }

    productos.push({
        nombre: nombre.trim(),
        stock: stock,
        precio: precio,
        peso: peso.trim()
    });

    RenderizarTabla();
    actualizarSelectProductos();

    alert("Producto añadido correctamente.");
});

// Mostrar Parte de Venta de Productos
ButtonMostrarVenta.addEventListener("click", () => {
    PrincipalMenu.classList.add("oculto");
    MostrarVentas.classList.remove("oculto");
});

ButtonVenderProducto.addEventListener("click", () => {
    const productoSeleccionado = SelectSellProducto.value;
    const cantidad = Number(CantidadAVender.value)

    if(cantidad <= 0 || isNaN(cantidad)){
        alert('Ingrese una cantidad valida');
    }

    const producto = productos.find (p => p.nombre == productoSeleccionado);

    if(!producto){
        alert("Producto Invalido.");
        return;
    }

    if (cantidad > producto.owned){
        alert(`No hay suficiente stock propio. Disponible: ${producto.owned} ${producto.peso}`);
    }

    producto.owned -= cantidad;
    producto.stock += cantidad;

    const ganancias = cantidad * producto.precio;

    MensajeVenta.textContent = `Venta realizada: ${cantidad} ${producto.peso} de ${producto.nombre}. Ganancias: $${ganancias}`;

    RenderizarTabla();
});

// Devuelve al Usuario a la Parte Anterior de la Pagina
ButtonVolver.forEach(boton => {
    boton.addEventListener("click", () => {
        MostrarSeccion(PrincipalMenu);
    });
});
/////////////////////////////////// Funciones Bottones ///////////////////////////////////////

RenderizarTabla();
