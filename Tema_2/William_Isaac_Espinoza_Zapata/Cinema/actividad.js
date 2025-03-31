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

/**
 * Sugiere asientos contiguos para reservar.
 * @param {number} numAsientos - Número de asientos a reservar.
 * @returns {Set} - Set con los IDs de los asientos sugeridos o set vacío si no es posible.
 */
function suggest(numAsientos) {
    // Verificar si el número de asientos excede el tamaño de una fila
    if (numAsientos > N) {
        return new Set();
    }

    // Recorrer filas desde la más lejana (última) hasta la más cercana (primera)
    for (let i = N - 1; i >= 0; i--) {
        const fila = butacas[i];

        // Buscar secuencia de asientos libres contiguos en esta fila
        for (let j = 0; j <= N - numAsientos; j++) {
            let asientosContiguosLibres = true;

            // Verificar si hay suficientes asientos libres consecutivos
            for (let k = 0; k < numAsientos; k++) {
                if (fila[j + k].estado === true) { // Si está ocupado
                    asientosContiguosLibres = false;
                    break;
                }
            }

            // Si encontramos suficientes asientos libres contiguos, devolver sus IDs
            if (asientosContiguosLibres) {
                const asientosSugeridos = new Set();
                for (let k = 0; k < numAsientos; k++) {
                    asientosSugeridos.add(fila[j + k].id);
                }
                return asientosSugeridos;
            }
        }
    }

    // Si no se encontraron suficientes asientos contiguos en ninguna fila
    return new Set();
}

// Ejemplo de uso:
butacas[9][0].estado = true; // Ocupar el primer asiento de la última fila
butacas[9][5].estado = true; // Ocupar un asiento en medio de la última fila

// Probar la función
console.log("Sugerencia para 3 asientos:", suggest(3));
console.log("Sugerencia para 11 asientos:", suggest(11));