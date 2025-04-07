
function getEstadoRandom() {
    // Uso deliberado de Math.random: No se requiere seguridad criptográfica aquí.
    // Solo simulamos disponibilidad de asientos (no afecta seguridad).
    return Math.random() < 0.3; // 30% true (ocupado), 70% false (libre)
}

// Definir el tamaño de la sala

const FILAS = 10; // Filas
const ASIENTOSFILA = 10;  // Asientos

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];

    for (let i = 0; i < FILAS; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < ASIENTOSFILA; j++) {
            // Nuevo asiento
            fila.push({
                id: idContador++,
                estado: getEstadoRandom()
            });
        }
        butacas.push(fila);
    }
    return butacas;
}


function suggest(nroAsientosReserva) {
    let setResult = new Set();

    /*Si el número de asientos solicitados excede el tamaño máximo de la fila, la función debe devolver un set vacío.*/
    if (nroAsientosReserva > ASIENTOSFILA) {
        setResult = new Set();
    } else {
        let encontroDisponible = false;
        /* Iniciamos la busqueda de asientos disponibles desde la última fila */
        let asientosSeleccionados = new Set();

        for (let i = FILAS - 1; i >= 0 && !encontroDisponible; i--) {
            /*Hay suficientes asientos disponibles en esta fila?*/

            let fila = sala[i];
            const asientosLibres = fila.filter(asiento => !asiento.estado).length;

            console.log(
                "Fila " + (i) + " : " + asientosLibres + " asientos libres de " + sala[i].length
            );

            if (fila.filter(asiento => !asiento.estado).length >= nroAsientosReserva) {

                console.log('*** Butacas disponibles');
                asientosSeleccionados.clear();
                let asientosContinuos = 0;
                for (let j = 0; j < ASIENTOSFILA && asientosContinuos != nroAsientosReserva; j++) {
                    console.log("fila " + i + " puesto " + j);
                    if (!fila[j].estado){
                        asientosSeleccionados.add(fila[j].id);
                        asientosContinuos++;
                    } else {
                        asientosContinuos = 0;
                        asientosSeleccionados.clear();
                    }
                }

                if (asientosSeleccionados.size === nroAsientosReserva) {
                    encontroDisponible = true;
                }
            }
        }

        console.log("Encontro asientos disponibles " + encontroDisponible);
        console.log(asientosSeleccionados);

        return asientosSeleccionados;

    }

}
// Inicializar la matriz
let sala = setup();

// Imprimir la matriz
console.log(sala);

const asientosPreSeleccionados = suggest(3);
console.log(asientosPreSeleccionados);
