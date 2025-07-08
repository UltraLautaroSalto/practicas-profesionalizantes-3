document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    let expresion = "";

    // Funciones manejadoras individuales
    function agregarNumero(num) {
        expresion += num;
        display.value = expresion;
    }

    function agregarOperador(op) {
        if (expresion !== "" && !/[*+\-/]$/.test(expresion)) {
            expresion += op;
            display.value = expresion;
        }
    }

    function agregarDecimal() {
        if (!/\.\d*$/.test(expresion)) {
            expresion += ".";
            display.value = expresion;
        }
    }

    function calcularResultado() {
        try {
            expresion = eval(expresion).toString();
            display.value = expresion;
        } catch (error) {
            display.value = "Error";
            expresion = "";
        }
    }

    function borrarTodo() {
        expresion = "";
        display.value = "";
    }

    function borrarUltimo() {
        expresion = expresion.slice(0, -1);
        display.value = expresion;
    }

    // Asignación de eventos por ID
    document.getElementById("btn1").addEventListener("click", () => agregarNumero("1"));
    document.getElementById("btn2").addEventListener("click", () => agregarNumero("2"));
    document.getElementById("btn3").addEventListener("click", () => agregarNumero("3"));
    document.getElementById("btn4").addEventListener("click", () => agregarNumero("4"));
    document.getElementById("btn5").addEventListener("click", () => agregarNumero("5"));
    document.getElementById("btn6").addEventListener("click", () => agregarNumero("6"));
    document.getElementById("btn7").addEventListener("click", () => agregarNumero("7"));
    document.getElementById("btn8").addEventListener("click", () => agregarNumero("8"));
    document.getElementById("btn9").addEventListener("click", () => agregarNumero("9"));

    document.getElementById("btnSuma").addEventListener("click", () => agregarOperador("+"));
    document.getElementById("btnResta").addEventListener("click", () => agregarOperador("-"));
    document.getElementById("btnMultiplica").addEventListener("click", () => agregarOperador("*"));
    document.getElementById("btnDivide").addEventListener("click", () => agregarOperador("/"));

    document.getElementById("btnPunto").addEventListener("click", agregarDecimal);
    document.getElementById("btnIgual").addEventListener("click", calcularResultado);
    document.getElementById("btnBorrar").addEventListener("click", borrarTodo);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Backspace") {
            borrarUltimo();
        }
    });
});