class Impresora {
    constructor(marca, modelo, carga){
        this.marca = marca;
        this.modelo = modelo;
        this.carga = carga;  // Valor para la Carga de Tinta en MiliLitros
        this.encendido = false; // Valor para Prender y Apagar la Impresora
    }
}

encender(); {
    if (this.carga > 0) {
      if (!this.encendido) {
        this.encendido = true;
        console.log(`${this.marca} ${this.modelo} ha sido encendido.`);
      } else {
        console.log(`${this.marca} ${this.modelo} ya está encendido.`);
      }
    } else {
      console.log(`No se puede encender ${this.marca} ${this.modelo}. ¡Sin Carga de Tinta!`);
    }
}

apagar(); {
    if (this.encendido) {
      this.encendido = false;
      console.log(`${this.marca} ${this.modelo} ha sido apagado.`);
    } else {
      console.log(`${this.marca} ${this.modelo} ya está apagado.`);
    }
}

imprimir(); {
    if (this.carga > 0){
        if(this.encendido = True){
            console.log(`${this.marca} ${this.modelo} Impresion Realizada.`);
        } else {
            console.log(`${this.marca} ${this.modelo} No está Encendida`);
        }
    } else {
        console.log(`${this.marca} ${this.modelo} ¡Sin Carga de Tinta!`);
    }
}

mostrarInformacion(); {
    console.log(`Marca: ${this.marca}, Modelo: ${this.modelo}, Año: ${this.año}, Carga: ${this.carga}ML`);
}

recargarCarga(MiliLitros); {
    this.carga += MiliLitros;
    console.log(`${this.marca} ${this.modelo} ha sido recargado con ${MiliLitros}ML. Total: ${this.carga}ML`);
}

const miImpresora = new Auto("Epson", "Ecotank", 0);

miImpresora.mostrarInformacion();
miImpresora.encender(); // No se puede encender, no tiene combustible
miImpresora.recargarCombustible(20);
miImpresora.encender(); // Ahora sí se puede encender
miImpresora.imprimir(); // Imprime un Informe X
miImpresora.apagar();
