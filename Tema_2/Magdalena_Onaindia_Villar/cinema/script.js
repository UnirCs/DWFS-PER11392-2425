// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];

    for (let i = 0; i < N; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < N; j++) {
            // Nuevo asiento
            fila.push({
                id: idContador++,
                estado: false // Estado inicial libre
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

/**
 * Función que sugiere butacas disponibles consecutivas
 * @param {number} numSeats - Número de asientos a reservar
 * @returns {Set} - Conjunto de IDs de asientos sugeridos (vacío si no hay disponibles)
 */
function suggest(numSeats) {
    const seats = new Set();

    if (numSeats <= 0 || numSeats > N) {
        return seats;
    }

    let found = false;
    let row = butacas.length - 1;  //última fila

    //bucle externo (filas)
    while (row >= 0 && !found) {
        let consecutiveSeats = 0;
        let startIndex = -1;
        let seat = 0;

        //bucle interno (asientos)
        while (seat < butacas[row].length && !found) {
            if (!butacas[row][seat].estado) {
                if (consecutiveSeats === 0) {
                    startIndex = seat;
                }
                consecutiveSeats++;

                if (consecutiveSeats === numSeats) {
                    //asientos encontrados
                    for (let i = startIndex; i < startIndex + numSeats; i++) {
                        seats.add(butacas[row][i].id);
                    }
                    found = true;  //para no romper el invariante
                }
            } else {
                consecutiveSeats = 0;
                startIndex = -1;
            }
            seat++;
        }
        row--;
    }

    return seats;
}

// ===== tests=====

//modificar algunos asientos a ocupados para pruebas
butacas[9][0].estado = true;  // Fila 10, Asiento 1
butacas[9][3].estado = true;  // Fila 10, Asiento 2
butacas[9][6].estado = true;  // Fila 10, Asiento 5
butacas[9][9].estado = true;  // Fila 10, Asiento 10
butacas[8][0].estado = true;  // Fila 9, Asiento 1
butacas[8][5].estado = true;  // Fila 9, Asiento 6
butacas[7][0].estado = true;  // Fila 8, Asiento 1
butacas[7][7].estado = true;  // Fila 8, Asiento 8

console.log("=== Pruebas ===");
console.log("Buscar 1 asiento:", suggest(1));  //en F9
console.log("Buscar 3 asientos:", suggest(3)); // en F8
console.log("Buscar 5 asientos:", suggest(5)); //en F7
console.log("Buscar 10 asientos:", suggest(10)); // fila 6
console.log("Buscar 0 asientos:", suggest(0));   // Inválido - vacío
console.log("Buscar 11 asientos:", suggest(11)); // Inválido - muchos asientos

