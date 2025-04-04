// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];

    //const matriz = Array.from({ length: 10 }, () => Array(10).fill(0));

    //console.table(matriz);

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
    console.log("Butacas inicializadas");
    return butacas;
}

// Inicializar la matriz
let butacas = setup();


function suggest(numAsiento) {
    /*Si el número de asientos solicitados excede a 10, set vacío*/
    if (numAsiento > 10) {
        console.log("Asientos permitidos es 10.");
        return;
    }

    for (let row = butacas.length - 1; row >= 0; row--) {
        let asientosVacios = [];
        for (let col = 0; col < butacas[row].length; col++) {
            if (butacas[row][col].estado === false) {
                asientosVacios.push(butacas[row][col].id);

                // Si encontramos  asientos juntos, devolvemos el set
                if (asientosVacios.length === numAsiento) {
                    const sugerencia = new Set(asientosVacios);
                    console.log("Asientos sugeridos:", [...sugerencia].join(", "));
                    return;
                }

            } else {
                asientosVacios = [];
            }
        }
    }
    console.log("No suficientes asientos disponibles.");
}

/*butacas[9][1].estado = true;
butacas[9][2].estado = true;
butacas[9][7].estado = true;
butacas[9][8].estado = true; 
console.log(suggest(2));*/
