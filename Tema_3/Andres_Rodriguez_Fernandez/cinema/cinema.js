// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas
// Definir la matriz de butacas
let butacas = [];

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    

    console.log("Iniciando la matriz de butacas con " + N + " filas y " + N + " columnas.");
    // Crear la matriz de butacas
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

    // Comprobar si hay asientos disponibles
    console.log("Buscando " + nAsientos + " asientos disponibles.");
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
                    if (cont == nAsientos) {
                        for (let i = 0; i < nAsientos; i++) {
                            asientos.add(butacas[fila][columna + i].id);
                            encontrado = true;
                        }
                    }
                    flag = true;
                }
            }
        }
        console.log("Asientos sugeridos:", [...asientos].join(", "));
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