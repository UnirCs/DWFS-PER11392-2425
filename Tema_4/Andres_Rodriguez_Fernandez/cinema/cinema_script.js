// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Asignar manejadores de eventos a los campos del formulario
    document.getElementById('cantidad').addEventListener('change', bookSeats);
    document.getElementById('asientosForm').addEventListener('submit', confirmBooking);

    initCinema();
    setup();
    synchonize();
});

// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas
const idFila = 'fila-'; // Prefijo para el ID de las filas
const idColumna = 'columna-'; // Prefijo para el ID de las celdas
const estadoLibre = '0'; // Estado libre de la butaca
const estadoOcupada = '1'; // Estado ocupado de la butaca
const estadoSeleccionada = '2'; // Estado seleccionada de la butaca
const estiloButacaLibre = "silla"; // Clase para las sillas libres
const estiloButacaOcupada = "sillaOcupada"; // Clase para las sillas ocupadas
const estiloButacaSeleccionada = "sillaSeleccionada"; // Clase para las sillas seleccionadas
const nombreTablaHTML = "tabla"; // Nombre de la tabla HTML
const nombreInputButacas = 'cantidad'; // Nombre del input de butacas

// Definir la matriz de butacas
let butacas = [];
let butacasOcupadas = new Set();

/*
* Función que se invoca en el evento on-change del parámetro donde indica el usuario
* la cantidad de asientos que desea reservar.
* Se encarga de reservar los asientos sugeridos y liberar los ocupados.
*/
function bookSeats() {

    // Obtener el valor actual del input
    const input = document.getElementById(nombreInputButacas);
    const valor = input.value;
    booking(butacasOcupadas, estadoLibre); // Liberar los asientos ocupados
    butacasOcupadas.clear(); // Limpiar el conjunto de butacas ocupadas

    if (valor != 0) {
        butacasOcupadas = suggest(valor); // Obtener los asientos sugeridos
        if (butacasOcupadas.size == 0) {
            alert("No hay asientos disponibles para la cantidad solicitada.");
        } else {
            booking(butacasOcupadas, estadoSeleccionada); // Reservar los asientos sugeridos
        }
    }
    synchonize();
}

/**
 *  Confirma las butacas que estan pre-seleccionadas por el usuario
 * @param {*} event 
 */
function confirmBooking(event) {
    event.preventDefault();
    if (butacasOcupadas.size == 0) {
        alert("No hay asientos seleccionados.");
        return;
    }

    let mensaje = "Asientos reservados: " + getButacasSeleccionadas() + "\n¿Desea confirmar la reserva?";
    if (confirm(mensaje)) {
        booking(butacasOcupadas, estadoOcupada);
        synchonize();
        butacasOcupadas.clear();
        // Confirmar reserva
        alert("Reserva confirmada.");
    } else {
        alert("Reserva cancelada.");
        booking(butacasOcupadas, estadoLibre); // Liberar los asientos ocupados
        butacasOcupadas.clear(); // Limpiar el conjunto de butacas ocupadas
        synchonize();
    }
    // Obtener el valor actual del input
    document.getElementById(nombreInputButacas).value = 0;
}

/**
 * Inicializa la tabla HTML del cine asignando IDs a las filas y columnas
 * y asignando clases a las celdas.
 */
function initCinema() {
    let filaIdx = 1;
    let columnaIdx = 0; // Inicializa un contador para los nuevos IDs
    const tabla = document.getElementById(nombreTablaHTML); // Selecciona la tabla

    // Recorre todas las filas de la tabla
    for (const fila of tabla.rows) {
        fila.id = idFila + filaIdx; // Cambia el ID de cada fila

        // Recorre todas las celdas dentro de cada fila
        columnaIdx = 0;
        for (const celda of fila.cells) {
            celda.id = idColumna + columnaIdx; // Cambia el ID de cada celda
            columnaIdx++; // Incrementa el contador
        }
        filaIdx++; // Incrementa el índice de fila
    }
}

/**
 *  Inicializa la matriz que representa el cine con todos los asientos del cine en estado disponibles
 *  @returns {Array} : Matriz de butacas
 */
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)

    // Crear la matriz de butacas
    for (let i = 0; i < N; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < N; j++) {
            // Nuevo asiento
            fila.push({
                id: idContador++,
                estado: estadoLibre // Estado inicial libre
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

/**
 * Sincroniza la matriz de butacas con la tabla HTML
 * Cambia el color de las celdas según el estado de los asientos (libre u ocupado)
 */
function synchonize() {

    const tabla = document.getElementById(nombreTablaHTML);
    const filas = tabla.rows; // Obtener las filas de la tabla

    // Recorrer la matriz y asignar los valores a la tabla
    for (let i = 0; i < butacas.length; i++) {
        let filaDatos = butacas[i]; // Fila de la matriz
        let celdas = filas[i].cells; // Celdas de la fila actual en la tabla

        for (let j = 0; j < filaDatos.length; j++) {
            switch (butacas[i][j].estado) {
                case estadoLibre:
                    celdas[j + 1].className = estiloButacaLibre; // Butaca libre
                    break;
                case estadoOcupada:
                    celdas[j + 1].className = estiloButacaOcupada; // Butaca ocupada
                    break;
                case estadoSeleccionada:
                    celdas[j + 1].className = estiloButacaSeleccionada; // Butaca seleccionada  
                    break;
            }
        }
    }
}

/**
 *  Dado un número de asientos a reservar busca tantos asientos libres que esten juntos como se
 * solicita, además empieza la búsqueda desde la última fila hacia la primera.
 * @param {number} nAsientos : Número de asientos a reservar
 * @returns {Set<number>} : Conjunto de asientos sugeridos
 */
function suggest(nAsientos = 1) {
    const asientos = new Set();

    // Comprobar si hay asientos disponibles
    if (nAsientos > N) {
        return asientos;
    } else {
        let flag = false;
        let encontrado = false;
        let cont = 0;

        for (let fila = N - 1; fila >= 0 && !encontrado; fila--) {
            flag = false;
            for (let columna = 0; columna < N && !flag; columna++) {
                cont = 0;
                if (butacas[fila][columna].estado == estadoLibre) {
                    for (let i = 0; i < nAsientos && columna + i < N; i++) {
                        if (columna + i < N && butacas[fila][columna + i].estado == false) {
                            cont++;
                        }
                    }
                    // Si se encuentra el bloque de asientos los marcamos
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
        //console.log("Asientos sugeridos:", [...asientos].join(", "));
        return asientos;
    }
}

/**
 * Reservar o liberar asientos
 * @param {Set} reserva: lista de asientos a reservar   
 * @param {boolean} estado: estado del asiento (reservado o liberado)
 */
function booking(reserva, estado) {
    let asiento, fila, columna;
    for (const item of reserva) {
        asiento = item;
        fila = Math.floor((asiento - 1) / N);
        columna = (asiento % N);
        if (columna == 0) {
            columna = N - 1;
        } else {
            columna = columna - 1;
        }
        butacas[fila][columna].estado = estado;
    }
}

/**
 * Función que devuelve el conjunto de butacas seleccionadas por el usuario
 * @returns {string} : Conjunto de butacas seleccionadas por el usuario
 */
function getButacasSeleccionadas() {

    let asiento, fila, columna;
    let asientos = "";
    for (const item of butacasOcupadas) {
        asiento = item;
        fila = Math.floor((asiento - 1) / N);
        columna = (asiento % N);
        columna ? 0 : columna = N;
        if (asientos == "") {
            asientos = columna;
        } else {
            asientos = asientos + ", " + columna;
        }
    }
    if (asientos != "") {
        return "Fila: " + (fila + 1) + " - Asientos: " + asientos;
    } else {
        return "No hay asientos seleccionados.";
    }
}