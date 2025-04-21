// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

//Leer el numero de butacas a reservar
const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

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

/*
Realizar Logica de la actividad.

    Si el número de asientos solicitados excede el tamaño máximo de la fila, la función debe devolver un set vacío.
    Si en ninguna fila hay suficientes asientos disponibles juntos, la función debe devolver un set vacío.
    Se comenzará a buscar asientos juntos en la fila más lejana a la pantalla, por lo que si varias filas pudiesen albergar el número de asientos solicitado, se elegiría siempre la más lejana a la pantalla. El resultado debe ser un Set con los ids de los asientos pre-seleccionados.

 */
function seleccionarButacas(numeroButacas, butacasArray) {
    let selectedButacas = [];
    let nButacas = numeroButacas

    //Devuelve set vacio si el numero de asientos solicitados excede el tamaño maximo de la fila
    if (numeroButacas > N) {
        return selectedButacas;
    }

    //Comienza a buscar asientos juntos desde la fila mas lejana a la pantalla
    for (let i = butacasArray.length - 1; i > 0; i--) {
        for (let j = butacasArray.length - 1; j > 0; j--) {
            if (!butacasArray[i][j].estado && //Revisar si la butaca actual esta libre9
                !butacasArray[i - 1][j - 1].estado && //Se revisa que el siguiente asiento tambien este vacio para asegurar que queden juntos
                nButacas > 0 //No debe pasarse del numero de butacas seleccionado
            ) {
                butacasArray[i][j].estado = true;
                nButacas--;
            }
        }
    }

    //Si en ninguna fila hay asientos disponibles, se devuelve un set vacio
    if (nButacas !== 0) {
        return selectedButacas;
    }

    //Devuelve las butacas seleccionada por la operacion
    selectedButacas = butacasArray;
    return selectedButacas;
}

//Mostar butacas seleccionadas (aquellas con TRUE en el estado)
function mostrarButacasSeleccionadas(butacasArray) {
    let butacasSeleccionadas = [];
    for (let i = 0; i < butacasArray.length; i++) {
        for (let j = 0; j < butacasArray.length; j++) {
            if (butacasArray[i][j].estado) {
                butacasSeleccionadas.push(butacasArray[i][j]);
            }
        }
    }
    console.log(butacasSeleccionadas);
}

// Inicializar la matriz
let butacas = setup();

//Preguntar al usuario cuantas butacas quiere y realizar la logica
rl.question(`Numero de butacas que desa reservar: `, numButacas => {
    //console.log(numButacas);
    if (isNaN(numButacas)) {
        console.log(`Error. Porfavor, digite un numero.`);
        rl.close();
        return;
    }
    butacas = seleccionarButacas(numButacas, butacas);
    mostrarButacasSeleccionadas(butacas);
    rl.close();
});

// Imprimir la matriz
//console.log(butacas);