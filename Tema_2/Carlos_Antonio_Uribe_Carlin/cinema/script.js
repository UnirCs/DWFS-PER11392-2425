// Definir el tamaño de la matriz de butacas
const N = 5; // Filas
const M = 12; // Columnas

const asientosOcupados = [
    [0, 5], [0, 6],
    [1, 0], [1, 1],
    [2, 1], [2, 2],
    [3, 2], [3, 3],
    [4, 2], [4, 3]
];

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1;
    let butacas = [];

    for (let i = 0; i < N; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < M; j++) {
            // Nuevo asiento
            fila.push({
                id: idContador++,
                estado: false
            });
        }
        butacas.push(fila);
    }

    // Establecer asientos ocupados inicialmente
    asientosOcupados.forEach(([fila, columna]) => {
        butacas[fila][columna].estado = true;
    });

    return butacas;
}

// Función para verificar asientos disponibles
function verificarAsientos(fila, cantidad) {
    let consecutivos = 0;
    let asientosEncontrados = false;

    for (let asiento of fila) {
        if (!asiento.estado) {
            consecutivos++;
        } else {
            consecutivos = 0;
        }
        if (consecutivos === cantidad) {
            asientosEncontrados = true;
        }
    }
    return asientosEncontrados;
}

// Función para obtener IDs de asientos
function obtenerIdsAsientos(fila, cantidad) {
    let ids = new Set();
    let consecutivos = 0;
    let indice = 0;

    while (indice < fila.length && consecutivos < cantidad) {
        if (!fila[indice].estado) {
            ids.add(fila[indice].id);
            consecutivos++;
        } else {
            ids.clear();
            consecutivos = 0;
        }
        indice++;
    }
    return consecutivos === cantidad ? ids : new Set();
}

// Función principal de sugerencia
function suggest(cantidad) {
    if (cantidad > M) return new Set();

    let butacas = setup();
    let mejorOpcion = new Set();
    let i = butacas.length - 1;

    while (i >= 0 && mejorOpcion.size === 0) {
        if (verificarAsientos(butacas[i], cantidad)) {
            mejorOpcion = obtenerIdsAsientos(butacas[i], cantidad);
        }
        i--;
    }

    return mejorOpcion;
}


document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('numAsientos');
    const button = document.getElementById('reservar');

    input.min = "1";
    input.max = String(M);
    input.value = "1";

    button.addEventListener('click', () => {
        const cantidad = parseInt(input.value);

        if (isNaN(cantidad) || cantidad < 1 || cantidad > M) {
            alert(`Por favor ingrese un número válido entre 1 y ${M}`);
            return;
        }

        const asientosSugeridos = suggest(cantidad);

        console.log('Asientos sugeridos:', asientosSugeridos);

        if (asientosSugeridos.size === 0) {
            alert('No hay suficientes asientos consecutivos disponibles');
        } else {
            const filas = document.querySelectorAll('.grid.grid-cols-12');

            // Limpiar selecciones previas
            document.querySelectorAll('.selected').forEach(asiento => {
                asiento.classList.remove('selected','fondo-asientos-reservados');
                asiento.classList.add('border', 'border-yellow-400');
            });

            // Marcar nuevas selecciones
            asientosSugeridos.forEach(id => {
                const fila = Math.floor((id - 1) / M);
                const col = (id - 1) % M;
                if (filas[fila]) {
                    const asiento = filas[fila].children[col];
                    if (asiento) {
                        asiento.classList.remove('border', 'border-yellow-400');
                        asiento.classList.add('selected','fondo-asientos-reservados');
                    }
                }
            });
        }
    });
});