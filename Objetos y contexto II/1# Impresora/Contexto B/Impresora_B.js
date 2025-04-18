class Impresora {
    constructor(marca, modelo, año, precio){
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
        this.precio = precio;
    }
}

mostrarInformacion(); {
    console.log(`Marca: ${this.marca}, Modelo: ${this.modelo}, Año: ${this.año}, Precio: ${this.precio}`);
}

Comprar(); {
    console.log(`${this.marca} ${this.modelo} ${this.año} Comprado por ${this.precio}$`);
}

const ventaImpresora = new Impresora("Epson", "Ecotankt", "2002", 2.700);

ventaImpresora.mostrarInformacion();
ventaImpresora.Comprar();