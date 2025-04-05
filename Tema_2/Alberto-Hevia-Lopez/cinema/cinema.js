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

        for(let j=0; j < numCols; j++ ) {
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

// Inicializar la matriz
let butacas = setup();


// Imprimir la matriz
console.log(butacas);

// Pruebas:
butacas[9][5].estado = true;
butacas[8][3].estado = true;
butacas[7][2].estado = true;
/*
butacas[6][3].estado = true;
butacas[5][3].estado = true;
butacas[4][3].estado = true;
butacas[3][3].estado = true;
butacas[2][3].estado = true;
butacas[1][3].estado = true;
butacas[0][3].estado = true;
 */
let res = suggest(7);
console.log(res);
