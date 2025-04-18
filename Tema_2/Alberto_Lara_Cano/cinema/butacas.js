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

function suggest(butacasToReserve) {
    const size = butacas.length;
    const lastRow = size - 1;
    const maxStartColumn = size - butacasToReserve;
    let reservedButacas = new Set();
    if (butacasToReserve > size || butacasToReserve <= 0) {
        return reservedButacas;
    }

    const checkConsecutiveButacas = (row, startCol) => {
        if (startCol + butacasToReserve > size) return false;
        return !butacas[row]
            .slice(startCol, startCol + butacasToReserve)
            .some((seat) => seat.estado);
    };

    for (let row = lastRow; row >= 0 && reservedButacas.size === 0; row--) {
        for (let col = 0; col <= maxStartColumn; col++) {
            if (checkConsecutiveButacas(row, col)) {
                reservedButacas = new Set(
                    butacas[row].slice(col, col + butacasToReserve).map((seat) => seat.id)
                );
            }
        }
    }
    return reservedButacas;
}
