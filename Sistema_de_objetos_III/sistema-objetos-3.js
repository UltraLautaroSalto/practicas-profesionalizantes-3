// === Clase base ===
class Figura {
    constructor(id, x, y, color) {
        this.id = id;
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.color = color;
    }

    mover(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    draw(ctx) {
        // Implementado por subclases
    }

    getTipo() {
        return this.constructor.name;
    }
}

// === Subclases específicas ===
class Rectangulo extends Figura {
    constructor(id, x, y, color, ancho, alto) {
        super(id, x, y, color);
        this.ancho = parseFloat(ancho);
        this.alto = parseFloat(alto);
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.ancho, this.alto);
    }
}

class Circulo extends Figura {
    constructor(id, x, y, color, radio) {
        super(id, x, y, color);
        this.radio = parseFloat(radio);
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
        ctx.fill();
    }
}

class Triangulo extends Figura {
    constructor(id, x, y, color, lado) {
        super(id, x, y, color);
        this.lado = parseFloat(lado);
        this.altura = Math.sqrt(3) / 2 * this.lado;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.lado / 2, this.y + this.altura);
        ctx.lineTo(this.x - this.lado / 2, this.y + this.altura);
        ctx.closePath();
        ctx.fill();
    }
}

// === Motor ===
class GameEngineRenderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.figuras = [];
        this.seleccionada = null;

        this._bindKeyEvents();
        this._loop();
    }

    agregarFigura(figura) {
        if (this.figuras.some(f => f.id === figura.id)) {
            alert("ID duplicado. Debe ser único.");
            return;
        }

        this.figuras.push(figura);
        this._agregarAFila(figura);
        this.render();
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.figuras.forEach(fig => {
            fig.draw(this.ctx);
        });

        // Dibuja borde si hay figura seleccionada
        if (this.seleccionada) {
            this.ctx.strokeStyle = "red";
            this.ctx.lineWidth = 2;

            const f = this.seleccionada;
            if (f instanceof Rectangulo) {
                this.ctx.strokeRect(f.x, f.y, f.ancho, f.alto);
            } else if (f instanceof Circulo) {
                this.ctx.beginPath();
                this.ctx.arc(f.x, f.y, f.radio + 2, 0, 2 * Math.PI);
                this.ctx.stroke();
            } else if (f instanceof Triangulo) {
                this.ctx.beginPath();
                this.ctx.moveTo(f.x, f.y - 5);
                this.ctx.lineTo(f.x + f.lado / 2, f.y + f.altura + 5);
                this.ctx.lineTo(f.x - f.lado / 2, f.y + f.altura + 5);
                this.ctx.closePath();
                this.ctx.stroke();
            }
        }
    }

    seleccionarFigura(id) {
        this.seleccionada = this.figuras.find(f => f.id === id);
        this._marcarSeleccionEnTabla(id);
        document.getElementById("activeFigureName").textContent = this.seleccionada?.id ?? "Ninguna";
        this.render();
    }

    _bindKeyEvents() {
        document.addEventListener("keydown", (e) => {
            if (!this.seleccionada) return;

            switch (e.key) {
                case "ArrowUp":
                    this.seleccionada.mover(0, -5);
                    break;
                case "ArrowDown":
                    this.seleccionada.mover(0, 5);
                    break;
                case "ArrowLeft":
                    this.seleccionada.mover(-5, 0);
                    break;
                case "ArrowRight":
                    this.seleccionada.mover(5, 0);
                    break;
            }

            this.render();
        });
    }

    _agregarAFila(figura) {
        const table = document.getElementById("figuresTable").querySelector("tbody");
        const row = document.createElement("tr");
        row.setAttribute("data-id", figura.id);
        row.innerHTML = `<td>${figura.getTipo()}</td><td>${figura.id}</td>`;

        row.addEventListener("click", () => {
            this.seleccionarFigura(figura.id);
        });

        table.appendChild(row);
    }

    _marcarSeleccionEnTabla(id) {
        document.querySelectorAll("#figuresTable tbody tr").forEach(row => {
            row.classList.toggle("selected", row.dataset.id === id);
        });
    }

    _loop() {
        setInterval(() => this.render(), 60);
    }
}

// === Interfaz global ===
const engine = new GameEngineRenderer("canvas");

function createFigure(tipo) {
    const id = prompt("Ingrese un identificador único:");
    if (!id) return;

    const x = prompt("Coordenada X:");
    const y = prompt("Coordenada Y:");
    const color = document.getElementById("colorPicker").value;

    let figura = null;

    if (tipo === "rectangle") {
        const ancho = prompt("Ancho:");
        const alto = prompt("Alto:");
        figura = new Rectangulo(id, x, y, color, ancho, alto);
    } else if (tipo === "circle") {
        const radio = prompt("Radio:");
        figura = new Circulo(id, x, y, color, radio);
    } else if (tipo === "triangle") {
        const lado = prompt("Lado del triángulo equilátero:");
        figura = new Triangulo(id, x, y, color, lado);
    }

    if (figura) {
        engine.agregarFigura(figura);
    }
}