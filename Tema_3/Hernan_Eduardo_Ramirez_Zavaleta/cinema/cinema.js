
// 01. Primero definimos el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

// Función para inicializar la matriz de butacas

function setup() {
    let idContador = 1;  // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];

    // i: filas
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

// Inicializar la matriz de butacas
let butacas = setup();


// Comprobamos visualmente si tenemos el número de butacas deseadas
//console.log(butacas)


// Ocupar algunas butacas para hacer pruebas
// butacas[8][1].estado = true; // Fila 10, columna 2 ocupada
// butacas[8][2].estado = true; // Fila 10, columna 3 ocupada
// butacas[8][3].estado = true; // Fila 10, columna 4 ocupada
// butacas[8][4].estado = true; // Fila 10, columna 5 ocupada

// butacas[9][1].estado = true; // Fila 10, columna 2 ocupada
// butacas[9][2].estado = true; // Fila 10, columna 3 ocupada
// butacas[9][3].estado = true; // Fila 10, columna 4 ocupada
// butacas[9][4].estado = true; // Fila 10, columna 5 ocupada

// Comprobamos visualmente los nuevos estados de las butacas
//console.log(butacas)
console.log("Butacas incializadas")

// Desarrollar en JavaScript la función suggest que recibe como argumento el número de asientos que se desea reservar
// Función para sugerir asientos:

function suggest(cantidad) {
    let seleccionados = new Set(); // Aquí guardamos los asientos seleccionados, el objeto set permite eliminar duplicados

    // Regla Núnmero 01:  Si el número de asientos solicitados excede el tamaño máximo de la fila, la función debe devolver un set vacío.
    if (cantidad > N) {
        return seleccionados; // Si en ninguna fila hay suficientes asientos disponibles juntos, la función debe devolver un set vacío.
    }

    let resultado = [];

    // 🔍 Buscamos desde la última fila hacia la primera por eso N-1 porque se cuenta desde 0 a 9 y terminado el bucle busca en la fila mas cercana
    for (let i = N - 1; i >= 0; i--) {
        let fila = butacas[i]; // Tomamos la fila actual
        let consecutivos = []; // Para guardar los asientos libres encontrados

        for (let j = 0; j < N; j++) {
            if (!fila[j].estado) { // Si el asiento está libre
                consecutivos.push(fila[j].id); // Lo añadimos

            } else {
                consecutivos = []; // Si encontramos un ocupado, reiniciamos la búsqueda
            }

            if (consecutivos.length === cantidad && resultado.length === 0) 

                // Solo guardamos si no hemos guardado otra opción antes
                resultado = consecutivos.slice(); // Copiamos los IDs encontrados
        }

        // Cuando ya tenemos un resultado válido, dejamos que el bucle termine solo
    }

    // Convertimos el resultado en un Set, puede ser vacío si no se encontró opción
    seleccionados = new Set(resultado);
    return seleccionados;

}


function probarSugerencia(valor) {
    const cantidad = parseInt(valor);
    if (!isNaN(cantidad)) {
        const resultado = suggest(cantidad);
        console.log("Butacas sugeridas:", resultado);
    }
}
