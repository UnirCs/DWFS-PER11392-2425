// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

const butacasFull = [
    [9,0], [9,1], [9,2], [9,3],
    [8,0], [8,1], [8,2], [8,3], [8,4],
    [7,0], [7,1], [7,2], [7,3], [7,4], [7,5],
    [6,0], [6,1],
    [5,0]
]

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
    for (let i=0; i<butacasFull.length; i++){
       butacas[butacasFull[i][0]][butacasFull[i][1]].estado = true;
    }
    return butacas;
}

// Inicializar la matriz
let butacas = setup();

// Imprimir la matriz
suggets(9);

function suggets(n_seats){
    let result = []
    let find = false;
    if (n_seats > N){
        result = []
        find = true;
        console.log("No hay suficientes asientos disponibles");
    }
    let contEmpty = 0;
    for (let i=N-1; i>0 && !find; i--){
        for (let j=N-1; j>0 && !find; j--){
            if (butacas[i][j].estado == false){
                contEmpty++;
            }
        }
        if (contEmpty >= n_seats){
            find = true;
            result = [i, n_seats]
            console.log("Se encontró la fila mas optima: ", i)
        }else{
            contEmpty = 0;
        }
    }
    if (!find){
        console.log("No hay suficientes asientos disponibles");
    }
    return result;
}