// Definir el tamaño de la matriz de butacas
const filas = 5; // Número de filas
const columnas = 11; // Número de columnas

const asientos = document.querySelectorAll(".cuadrado");

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];

    for (let i = 0; i < filas; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < columnas; j++) {
            // Nuevo asiento
            const id = idContador++;
            fila.push({
                id,
                //estado: false // Estado inicial libre
                estado: asientos[id - 1].classList.contains("relleno")
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

// Inicializar la matriz
let butacas = setup();

// Imprimir la matriz
console.log(butacas);

// Mi código
const nAsientos = document.querySelector("#nAsientos");
const formulario = document.querySelector("#formulario");

formulario.addEventListener("submit", e => {
    e.preventDefault();

    console.log(suggest(Number(nAsientos.value)));
})

function suggest(amount) {
    let set = new Set();
    // caso 1. el numero seleccionado supera el numero de butacas por fila
    if (amount > columnas) return set;
    // caso 2. el numero seleccionado supera el numero de butacas disponibles en todas las filas
    let disponibles = false;
    for (let i = 0; i < filas && disponibles === false; i++) {
        if (amount <= butacas[i].filter(butaca => butaca.estado === false).length) {
            disponibles = true;
        }
    }
    if (!disponibles) return set;
    // caso 3. buscar asientos consecutivos de arriba a abajo y de izquierda a derecha
    let encontardas = false;
    let butacasFinales = [];
    for (let i = 0; i < filas && encontardas === false; i++) {
        let butacasConsecutivas = [];
        for (let j = 0; j < columnas && encontardas === false; j++) {
            if (butacas[i][j].estado === false) {
                butacasConsecutivas.push(butacas[i][j].id);
                if (butacasConsecutivas.length === amount) {
                    encontardas = true;
                    butacasFinales = butacasConsecutivas;
                }
            }
            else {
                butacasConsecutivas = [];
            }
        }
    }

    // Reservar los asientos
    if (butacasFinales.length > 0) {
        for (let i = 0; i < butacasFinales.length; i++) {
            asientos[butacasFinales[i] - 1].classList.add("relleno");
            set.add(butacasFinales[i]);
        }
            
        butacas = setup();
        return set;
    }
    else return set;
}