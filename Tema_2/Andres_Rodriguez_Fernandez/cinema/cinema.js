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

//función para sugerir asiento
/**
 * 
 * @param {number} nAsientos 
 * @returns {Set}
 */
function suggest(nAsientos = 1) {
    const asientos = new Set();
    if (nAsientos > N) {
        return asientos;
    } else {
        let flag = false;
        let encontrado = false;
        let cont = 0;

        for (let fila = N - 1; fila >= 0 && encontrado == false; fila--) {
            flag = false;
            for (let columna = 0; columna < N && flag == false; columna++) {
                cont = 0;
                if (butacas[fila][columna].estado == false) {
                    for (let i = 0; i < nAsientos && columna + i < N; i++) {
                        if (columna + i < N && butacas[fila][columna + i].estado == false) {
                            cont++;
                        }
                    }
                    console.log(cont, nAsientos);
                    if (cont == nAsientos) {
                        for (let i = 0; i < nAsientos; i++) {
                            console.log(butacas[fila][columna + i]);
                            asientos.add(butacas[fila][columna + i].id);
                            encontrado = true;
                        }
                    }
                    flag = true;
                }
            }
        }
        return asientos;
    }
}

/**
 * @param {Set} reserva 
 */
function booking(reserva) {
    let asiento, fila, columna;
    for (const item of reserva) {
        asiento = item;
        fila = Math.floor(asiento / N);
        columna = (asiento % N) - 1;
        butacas[fila][columna].estado = true;
    }
}

// Inicializar la matriz
let butacas = setup();

// Imprimir la matriz
console.log(butacas);

// Reservar
let asientos = suggest(3);
booking(asientos);
booking(suggest(4));
booking(suggest(6));
booking(suggest(8));
console.log(butacas);
