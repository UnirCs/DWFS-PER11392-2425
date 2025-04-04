// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1;
    let butacas = [];

    for (let i = 0; i < N; i++) {
        let fila = [];
        for (let j = 0; j < N; j++) {
            fila.push({ id: idContador++, estado: false });
        }
        butacas.push(fila);
    }
    return butacas;
}

// Función para ocupar asientos por ID
function ocuparAsientosPorId(butacas, ids) {
    for (let i = 0; i < butacas.length; i++) {
        for (let j = 0; j < butacas[i].length; j++) {
            if (ids.includes(butacas[i][j].id)) {
                butacas[i][j].estado = true;
            }
        }
    }
}


function suggest(numAsientos, butacas) {
    if (numAsientos > N) return new Set();
    
    for (let i = butacas.length - 1; i >= 0; i--) {
        let fila = butacas[i];
        let setButacas = new Set();
        let contador = 0;

        
        for (let j = fila.length - 1; j >= 0; j--) {
            if (!fila[j].estado) { 
                setButacas.add(fila[j].id);
                contador++;

                
                if (contador === numAsientos) {
                    return setButacas;
                }
            } else {
                
                setButacas.clear();
                contador = 0;
            }
        }
    }

    
    return new Set();
}


const butacas = setup();


ocuparAsientosPorId(butacas, [99, 98, 97, 90, 93]); 


const numAsientos = 6;
let resultado = suggest(numAsientos, butacas);


console.log(butacas);
console.log(resultado.size > 0 ? `Butacas encontradas: ${[...resultado]}` : "No hay suficientes asientos juntos disponibles.");