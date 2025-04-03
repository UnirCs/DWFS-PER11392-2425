// Definir el tamaño de la matriz de butacas
const filas = 10;       // Número de filas
const columnas = 10;    // Número de columnas

// Inicializar la matriz
let butacas = setup();

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];

    for (let i = 0; i < filas; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < columnas; j++) {
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


function suggest(personas) {
    let asientos = new Set();

    for (let row = butacas.length - 1; row >= 0 && asientos.size === 0; row--) {
        for (let column = 0; column <= columnas - personas && asientos.size === 0; column++) {
            let grupoAsientos = butacas[row].slice(column, column + personas);
            
            if (!grupoAsientos.some(seat => seat.estado))
                grupoAsientos.forEach(seat => asientos.add(seat.id));
        }
    }

    console.log("Asientos sugeridos (" + asientos.size + "): " + [...asientos].map(String).join(', '));

    return asientos;
}
