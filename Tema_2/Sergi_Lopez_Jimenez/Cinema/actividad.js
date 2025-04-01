// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

//Numero butacas ocupadas
var nButacas = 0;

// Función para inicializar la matriz de butacas
function setup(coef) {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];

    for (let i = 0; i < N; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < N; j++) {
            // Nuevo asiento
            fila.push({
                id: idContador++,
                estado: (Math.random() < coef)? true:false // Estado inicial libre
            });

            if(fila.at(-1).estado == true){
                nButacas++;
            }
        }
        butacas.push(fila);
    }
    return butacas;
}

// Inicializar la matriz
let butacas = setup(0.3);

// Imprimir la matriz
console.log(butacas);

//Numero butacas ocupada
console.log("Numero de butacas ocupadas: " + nButacas);

/* SUGGEST FUNCTION
* @param {nAsientos} numero asientos pedidos por el cliente
* Se pide desarrollar en JavaScript la función suggest que recibe como argumento el número de asientos que se desea reservar.
* - Si el número de asientos solicitados excede el tamaño máximo de la fila, la función debe devolver un set vacío.
* - Si en ninguna fila hay suficientes asientos disponibles juntos, la función debe devolver un set vacío.
* - Se comenzará a buscar asientos juntos en la fila más lejana a la pantalla, por lo que si varias filas pudiesen albergar el número de asientos solicitado, se elegiría siempre la más lejana a la pantalla. El resultado debe ser un Set con los ids de los asientos pre-seleccionados.
*/
function suggest(nAsientos){
    let asientos = new Set();
    let found = false;
    //Empezamos a buscar asientos en la fila mas lejana, no hemos encontrado butacas
    //Para finalizar el loop, como condicion es que no superemos el tamaño de asientos disponibles fisicamente o que no hayamos encontrado butacas que satisfacen la condicion
    for(let row = N -1; row >= 0 && !found; row--){
        let tempSet = new Set();
        for(let col = 0; col < N && !found && nAsientos < butacas[row].length; col++){
            //Si esta desocupada, añadimos al set
            if(butacas[row][col].estado == false){
                tempSet.add(butacas[row][col].id);
                //Si hemos llegado al numero deseado de butacas, hemos encontrado el set, guardamos la condición de salida del bucle y el set de asientos a devolver
                if(tempSet.size == nAsientos){
                    found = true;
                    asientos = tempSet;
                }
            }
            //Si esta ocupada, como ya no pueden estar contiguas, reiniciamos el set
            else{
                tempSet.clear();
            }
        }
    }
    return asientos;
}

function logAsientos(setAsientos, asientosPedidos){
    console.log("Asientos pedidos: " + asientosPedidos + " Numero de asientos: " + setAsientos.size);
    if(setAsientos.size >0){
        for(const butaca of setAsientos){
            console.log("Fila: " + Math.trunc(butaca/N) + " Columna: " + butaca%N);
        }   
    }
}

asientos1 = suggest(15);
logAsientos(asientos1, 15);

asientos2 = suggest(10);
logAsientos(asientos2, 10);

asientos3 = suggest(5);
logAsientos(asientos3, 5);