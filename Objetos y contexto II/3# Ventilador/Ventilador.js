class Ventilador{
    constructor(marca, modelo, año){
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
        this.encendido = false;
    }
}

encender(); {
    if (!this.encendido) {
        this.encendido = true;
        console.log(`${this.marca} ${this.modelo} ${this.año} ha sido encendido.`);
    } else {
        console.log(`${this.marca} ${this.modelo} ${this.año} ya está encendido.`);
    }
}

apagar(); {
    if (!this.encendido) {
        this.encendido = false;
        console.log(`${this.marca} ${this.modelo} ${this.año} ha sido apagado.`);
    } else {
        console.log(`${this.marca} ${this.modelo} ${this.año} ya está apagado.`);
    }
}

mostrarInformacion(); {
    console.log(`Marca: ${this.marca}, Modelo: ${this.modelo}, Año: ${this.año}`);
}

const miVentilador = new Ventilador("KaceMaster", "Liliana", 2004);

miVentilador.mostrarInformacion();
miVentilador.encender();
miVentilador.apagar();