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
            if(i > 7 && j > 4) {
                fila.push({
                    id: idContador++,
                    estado: true // Estado inicial libre
                });
            }
            else{
                // Nuevo asiento
                fila.push({
                    id: idContador++,
                    estado: false // Estado inicial libre
                });
            }

        }
        butacas.push(fila);
    }
    return butacas;
}

function suggest(selected, butacas) {
    if (selected > butacas.length) { return [];}

    let isSelectionComplete = false;
    let selectedCounter = selected;
    let selectedChairs = [];
    for (let i = butacas.length - 1; i >= 0 && selectedChairs.length === 0 && !isSelectionComplete; i--) {
        for (let j = butacas.length - 1; j >= 0 && selectedChairs.length < selectedCounter && !isSelectionComplete; j--) {
            if(!butacas[i][j].estado && selectedChairs.length < selectedCounter){
                selectedChairs.push({ id: butacas[i][j].id, estado: true });
            }
            if(butacas[i][j].estado && selectedChairs.length < selectedCounter) {
                selectedChairs = [];
            }
            if (selectedChairs.length === selectedCounter) {
                isSelectionComplete = true;
            }
        }

        if (selectedChairs.length > 0 && isSelectionComplete) {
            for (let y=butacas.length - 1; y >= 0; y--) {
                let index = selectedChairs.findIndex( e => e.id === butacas[i][y].id);
                if (index !== -1 && butacas[i][y].id === selectedChairs[index].id) {
                    butacas[i][y].estado = true;
                }
            }
        }
        selectedChairs = [];
    }

    if(!isSelectionComplete){
        return [];
    }

    return butacas;
}

// Inicializar la matriz
let butacas = setup();

// Imprimir la matriz
//console.log(butacas);

let optionN = 1;

switch (optionN) {
    case 1: suggest(3, butacas); break;
    case 2: console.log(setup()); break;
    default: //ejemplo();
}