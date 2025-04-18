// Clase Auto que representa un vehículo simple
class Auto {
  constructor(marca, modelo, año) {
    this.marca = marca;
    this.modelo = modelo;
    this.año = año;
    this.encendido = false; // Estado del auto
  }

  // Método para encender el auto
  encender() {
    if (!this.encendido) {
      this.encendido = true;
      console.log(`${this.marca} ${this.modelo} ha sido encendido.`);
    } else {
      console.log(`${this.marca} ${this.modelo} ya está encendido.`);
    }
  }

  // Método para apagar el auto
  apagar() {
    if (this.encendido) {
      this.encendido = false;
      console.log(`${this.marca} ${this.modelo} ha sido apagado.`);
    } else {
      console.log(`${this.marca} ${this.modelo} ya está apagado.`);
    }
  }

  // Método para mostrar información del auto
  mostrarInformacion() {
    console.log(`Marca: ${this.marca}, Modelo: ${this.modelo}, Año: ${this.año}`);
  }
}

// Uso de la clase Auto
const miAuto = new Auto("Toyota", "Corolla", 2022);

miAuto.mostrarInformacion(); // Solo muestra lo importante
miAuto.encender();           // Encendemos el auto
miAuto.apagar();             // Apagamos el auto