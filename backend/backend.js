let VidrioStock = 50; let VidrioPrecio = 1500;
let HierroStock = 459; let HierroPrecio = 2500;
let AluminioStock = 238; let AluminioPrecio = 2000;
let CobreStock = 154; let CobrePrecio = 3500;
let BronceStock = 375; let BroncePrecio = 5000;
let CartonStock = 200; let CartonPrecio = 500;
let PapelStock = 184; let PapelPrecio = 250;
let TapasStock = 427; let TapasPrecio = 750;
let AceiteStock = 900; let AceitePrecio = 1250;
let BateriasStock = 45; let BateriasPrecio = 4000;

const table = document.getElementById("table");
const PrincipalMenu = document.getElementById("PrincipalMenu"); // Constantes para Ocultar
const MostrarStock = document.getElementById("Stock"); // Constantes para Ocultar
const MostrarCompras = document.getElementById("Compras"); // Constantes para Ocultar
const MostrarVentas = document.getElementById("Vender"); // Constantes para Ocultar

const ButtonMostrarStock = document.getElementById("PMOption1"); // Constantes del Boton para ver la Seccion de "Stock"
const ButtonMostrarCompras = document.getElementById("PMOption2"); // Constantes del Boton para ver la Seccion de "Compras"
const ButtonMostrarVenta = document.getElementById("PMOption3"); // Constantes del Boton para ver la Seccion de "Venta"

const SelectBuyProducto = document.getElementById("ProductoComprar"); // Constante del Producto Seleccionado a Comprar
const CantidadBuyProducto = document.getElementById("CantidadAComprar"); // Constante de la Cantidad de Producto a Comprar
const ButtonComprarProducto = document.getElementById("ComprarProducto"); // Costante del Boton para Comprar Productos
const MensajeCompra = document.getElementById("MensajeCompra"); // Constante que se ocupa del mensaje que sale cuando Compras Algo

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
    </tr>
    <tr>
        <td>Vidrio</td>
        <td>${VidrioStock} Kg</td>
        <td>${VidrioPrecio} X 1 Kg</td>
    </tr>
    <tr>
        <td>Hierro</td>
        <td>${HierroStock} Kg</td>
        <td>${HierroPrecio} X 1 Kg</td>
    </tr>
    <tr>
        <td>Aluminio</td>
        <td>${AluminioStock} Kg</td>
        <td>${AluminioPrecio} x 1 Kg</td>
    </tr>
    <tr>
        <td>Cobre</td>
        <td>${CobreStock} Kg</td>
        <td>${CobrePrecio} X 1 Kg</td>
    </tr>
    <tr>
        <td>Bronce</td>
        <td>${BronceStock} Kg</td>
        <td>${BroncePrecio} X 1 Kg</td>
    </tr>
    <tr>
        <td>Cartón</td>
        <td>${CartonStock} Kg</td>
        <td>${CartonPrecio} X 1 Kg</td>
    </tr>
    <tr>
        <td>Papel Blanco</td>
        <td>${PapelStock} Kg</td>
        <td>${PapelPrecio} X 1 Kg</td>
    </tr>
    <tr>
        <td>Tapas de Plástico</td>
        <td>${TapasStock} Kg</td>
        <td>${TapasPrecio} X 1 Kg</td>
    </tr>
    <tr>
        <td>Aceite de girasol</td>
        <td>${AceiteStock} M^3</td>
        <td>${AceitePrecio} X 1 M^3</td>
    </tr>
    <tr>
        <td>Baterías de vehículos</td>
        <td>${BateriasStock} Unidades</td>
        <td>${BateriasPrecio} Cada Unidad</td>
    </tr>
    `;
}

// Mostrar la Lista de Compra de Productos
ButtonMostrarCompras.addEventListener("click", () => {
    RenderizarTabla();
    PrincipalMenu.classList.add("oculto");
    MostrarCompras.classList.remove("oculto");
});

// Comprar un Producto, calcular el precio total y restar lo comprado del Stock total
ButtonComprarProducto.addEventListener("click", () => {
    const producto = SelectBuyProducto.value;
    const cantidad = Number(CantidadAComprar.value);

    if (cantidad <= 0 || isNaN(cantidad)) {
        alert(`Ingresá una cantidad válida.`);
        return;
    }

    let precio = 0;
    let stock = 0;
    let unidad = "Kg";
    switch(producto){
        case "Vidrio":
            stock = VidrioStock;
            precio = VidrioPrecio;
            unidad = "Kg";
            break;

        case "Hierro":
            stock = HierroStock;
            precio = HierroPrecio;
            unidad = "Kg";
            break;

        case "Aluminio":
            stock = AluminioStock;
            precio = AluminioPrecio;
            unidad = "Kg";
            break;

        case "Cobre":
            stock = CobreStock;
            precio = CobrePrecio;
            unidad = "Kg";
            break;

        case "Bronce":
            stock = BronceStock;
            precio = BroncePrecio;
            unidad = "Kg";
            break;

        case "Carton":
            stock = CartonStock;
            precio = CartonPrecio;
            unidad = "Kg";
            break;

        case "Papel":
            stock = PapelStock;
            precio = PapelPrecio;
            unidad = "Kg";
            break;

        case "TapasDePlastico":
            stock = TapasStock;
            precio = TapasPrecio;
            unidad = "Kg";
            break;

        case "Aceite":
            stock = AceiteStock;
            precio = AceitePrecio;
            unidad = "M^3";
            break;

        case "Baterias":
            stock = BateriasStock;
            precio = BateriasPrecio;
            unidad = "Unidad";
            break;

        default:
            alert("Producto inválido");
            return;
    }

    if (cantidad > stock){
        alert(`No hay suficiente stock. Disponible: ${stock} ${unidad}`);
        return;
    }

    switch(producto){
        case "Vidrio":
            VidrioStock -= cantidad;
        break;
        case "Hierro":
            HierroStock -= cantidad;
        break;
        case "Aluminio":
            AluminioStock -= cantidad;
        break;
        case "Cobre":
            CobreStock -= cantidad;
        break;
        case "Bronce":
            BronceStock -= cantidad;
        break;
        case "Carton":
            CartonStock -= cantidad;
        break;
        case "Papel":
            PapelStock -= cantidad;
        break;
        case "TapasDePlastico":
            TapasStock -= cantidad;
        break;
        case "Aceite":
            AceiteStock -= cantidad;
        break;
        case "Baterias":
            BateriasStock -= cantidad;
        break;
    }

    const total = cantidad * precio;
    MensajeCompra.textContent = `Compra realizada: ${cantidad} ${unidad} de ${producto}. Total: $${total}`;

    RenderizarTabla();
    CantidadBuyProducto.value = "";
});

// Mostrar Parte de Venta de Productos
ButtonMostrarVenta.addEventListener("click", () => {
    PrincipalMenu.classList.add("oculto");
    MostrarVentas.classList.remove("oculto");
});

// Devuelve al Usuario a la Parte Anterior de la Pagina
ButtonVolver.forEach(boton => {
    boton.addEventListener("click", () => {
        MostrarSeccion(PrincipalMenu);
    });
});
/////////////////////////////////// Funciones Bottones ///////////////////////////////////////

RenderizarTabla();
