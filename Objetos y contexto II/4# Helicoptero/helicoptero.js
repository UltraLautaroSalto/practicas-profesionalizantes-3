class Helicopter {
    constructor(armor, fuel, load, lives, guns, hydras, score) {
        this.armor = armor;
        this.fuel = fuel;
        this.load = load;
        this.lives = lives;
        this.guns = guns;
        this.hydras = hydras;
        this.score = score;
    }

    showStats() {
        console.log(`--- HELICOPTER STATS ---`);
        console.log(`ARMOR: ${this.armor}`);
        console.log(`FUEL: ${this.fuel}`);
        console.log(`LOAD: ${this.load}`);
        console.log(`LIVES: ${this.lives}`);
        console.log(`GUNS: ${this.guns}`);
        console.log(`HYDRAS: ${this.hydras}`);
        console.log(`SCORE: ${this.score}`);
        console.log('------------------------\n');
    }

    destroyHydra() {
        const fuelCost = 10;
        const ammoCost = 5;

        if (this.hydras <= 0) {
            console.log("No quedan Hydras para destruir.");
            return;
        }

        if (this.fuel < fuelCost) {
            console.log("¡No hay suficiente combustible para disparar!");
            return;
        }

        if (this.guns < ammoCost) {
            console.log("¡No hay suficiente munición para disparar!");
            return;
        }

        // Consumir recursos
        this.fuel -= fuelCost;
        this.guns -= ammoCost;
        this.hydras--;
        this.score += 100;

        console.log(`Hydra destruido! +100 puntos. (-${fuelCost} fuel, -${ammoCost} balas)`);
    }
}

// Crear helicóptero
const myHelicopter = new Helicopter(600, 100, 0, 3, 10, 2, 0);

// Mostrar stats iniciales
myHelicopter.showStats();

// Intentar destruir Hydras
myHelicopter.destroyHydra();
myHelicopter.showStats();

myHelicopter.destroyHydra();
myHelicopter.showStats();

// Intento fallido si ya no hay recursos
myHelicopter.destroyHydra();