// Definir el tamaño de la matriz de butacas
const filas = 5;        // Número de filas
const columnas = 13;    // Número de columnas

// Creamos e inicializamos la matriz
let butacas = setup();
// Asignamos los Ids a cada butaca: la primera butaca de la izquierda de la fila 1 será 0, la siguiente 1, la primera de la fila 2 será 13 y así sucesivamente.
asignarIds();

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Asignar manejadores de eventos a los campos del formulario
    document.getElementById('numAsientos').addEventListener('change', seleccionarAsientos);
});

// Asignamos Ids a las butacas de una tabla
function asignarIds() {
    console.log("Asignamos idsButacas");
    const mButacas = document.getElementById("matrizButacas");
    let numId = 0;

    for (let i=0; i<mButacas.rows.length; i++) {
        const fila = mButacas.rows[i];
        for(let j=1; j<fila.cells.length; j++) {
            ++numId;
            const butaca = fila.cells[j];
            butaca.id = "b" + numId;
        }
    }
}

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
    // Marcamos las butacas que están originalmente marcadas en nuestro ejemplo.
    butacas[0][5].estado = true;
    butacas[0][6].estado = true;
    butacas[1][0].estado = true;
    butacas[1][1].estado = true;
    butacas[2][1].estado = true;
    butacas[2][2].estado = true;
    butacas[3][2].estado = true;
    butacas[3][3].estado = true;
    butacas[4][2].estado = true;
    butacas[4][3].estado = true;

    return butacas;
}

// Obtiene un conjunto con los identificadores de los asientos pre-seleccionados
function suggest(numAsientos) {

    let resultado = new Set();
    let butCons = new Set();
    let i = butacas.length - 1;
    let encontrado = false;
    let numCols = butacas[0].length;

    while(i>=0 && !encontrado) {

        let butLibres = 0;
        butCons = new Set();

        for(let j=0; j < numCols && butLibres < numAsientos; j++ ) {
            if(butacas[i][j].estado === false) {
                butLibres++;                                        // Tenemos un asiento libre más.
                if(butLibres<=numAsientos) butCons.add(butacas[i][j].id);
            }
            else {
                butLibres=0;
                butCons = new Set();                                // Ponemos a 0 el conjunto de butacas seguidas
            }                                                       // Comenzamos de 0. Tienen que ser numAsientos libres
        }

        if(butLibres >= numAsientos) {
            encontrado = true;                                      // Nos salimos del bucle
            resultado = butCons;
        }
        i--;
    }

    return resultado;
}

// SeleccionarAsientas es la función que nos permite gestionar la selección de asientos, validación y pintarlos en pantalla.
function seleccionarAsientos() {

    // Primero obtenemos el número de butacas seleccionadas
    let butacasSel = document.getElementById('numAsientos').value;

    if (butacasSel>0) {
        asignarIds();

        butacas = setup();

        // Dejamos las butacas en el estado original (antes de seleccionar cualquier butaca).
        let numId = 0;
        for (let i = 0; i < filas; i++) {
            for (let j = 0; j < columnas; j++) {
                const butaca = document.getElementById("b" + ++numId);
                if(butacas[i][j].estado === false) butaca.classList.remove("ocupado");
            }
        }

        // Obtenemos las butacas en función del número de butacas indicadas en el input.
        let res = suggest(butacasSel);

        // Asignamos la clase ocupado a los asientos seleccionados
        res.forEach(elemento => {
                    const butaca = document.getElementById("b" + elemento);
                    butaca.classList.add("ocupado");
        });
    }
}

