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


function ocuparAsientosPorId(butacas, ids) {
    for (let i = 0; i < butacas.length; i++) {
        for (let j = 0; j < butacas[i].length; j++) {
            for (let k = 0; k < ids.length; k++) {
                if (butacas[i][j].id === ids[k]) {
                    butacas[i][j].estado = true;
                }
            }
        }
    }
}


function buscarConsecutivosLibres(fila, numAsientos) {
    let contador = 0;

    for (let i = 0; i < fila.length; i++) {
        if (!fila[i].estado) {
            contador++;
        } else {
            contador = 0;
        }

        if (contador === numAsientos) {
            
            let ids = [];
            for (let j = i - numAsientos + 1; j <= i; j++) {
                ids.push(fila[j].id);
            }
            return ids;
        }
    }

    return [];
}


function suggest(butacas, numAsientos) {
    let resultado = new Set();

    if (numAsientos <= N) {
        
        for (let i = butacas.length - 1; i >= 0; i--) {
            let idsLibres = buscarConsecutivosLibres(butacas[i], numAsientos);
            if (idsLibres.length > 0) {
                resultado = new Set(idsLibres);
                break;
            }
        }
    }

    return resultado;
}


const butacas = setup();
ocuparAsientosPorId(butacas, [99, 98, 97, 90, 93]);

const numAsientos = 11;
const resultado = suggest(butacas, numAsientos);
console.log(resultado);