// Definir el tamaño de la matriz de butacas
const N = 4; // Número de filas y columnas

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

// Inicializar la matriz
let butacas = setup();


// Imprimir la matriz
console.log(butacas);

const suggest = (numButacas) => {
    let listSuggest=[]
    for (let j = butacas.length-1; j >= 0; j--) {
        let auxJuntos= 0
        let limit = butacas[j].length
        for (let k = 0; k < limit; k++) butacas[j][k] ? auxJuntos += 1: auxJuntos = 0;
        if(auxJuntos >= numButacas){
            for (let k = 0; k < numButacas; k++) {
                listSuggest.push(butacas[j][k].id);
            }
            break
        }
    }
    return listSuggest;
}

suggest(2)