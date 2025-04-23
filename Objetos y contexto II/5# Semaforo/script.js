class Semaforo {
    constructor() {
        this.colores = ["rojo", "verde", "amarillo"];
        this.indice = 0;
        this.estado = false;
        this.intervalo = null;
    }

    encenderLuz(color) {
        this.colores.forEach(c => {
            document.getElementById(c).classList.remove("encendido");
        });
        document.getElementById(color).classList.add("encendido");
    }

    cambiarColor() {
        const color = this.colores[this.indice];
        this.encenderLuz(color);
        this.indice = (this.indice + 1) % this.colores.length;
    }

    iniciar() {
        if (!this.estado) {
            this.estado = true;
            this.cambiarColor();
            this.intervalo = setInterval(() => this.cambiarColor(), 2000);
        }
    }

    detener() {
        this.estado = false;
        clearInterval(this.intervalo);
        this.encenderLuz(""); // apaga todo
    }
}

const semaforo = new Semaforo();

function iniciar() {
    semaforo.iniciar();
}

function detener() {
    semaforo.detener();
}