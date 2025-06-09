// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

var nButacas = 0;
let setLastSeats = new Set();

// Función para inicializar la matriz de butacas
function setup() {
    //Leemos la table de html por id y recogemos las filas de la table por tagName
    const table = document.getElementById("tabla-butacas");
    const filas = table.getElementsByTagName("tr"); //obtenemos un array de filas
    
    let idContador = 1;
    let butacas = [];

    //Como tenemos un 
    for (let i = 1; i < N+1; i++) {
        // Nueva fila
        let fila = [];
        //Recuperamos las celdas del elemento fila, nos devuelve un array de celdas
        const celdas = filas[i].cells;
        // console.log(celdas);
        for (let j = 1; j < N+1; j++) {
            const celda = celdas[j];
            // Nuevo asiento
            fila.push({
                id: idContador++,
                estado: (celda.classList.contains("ocupada"))? true:false
            });

            if(fila.at(-1).estado == true){
                nButacas++;
            }
        }
        butacas.push(fila);
    }
    //console.log(butacas);
    return butacas;
}


/* SUGGEST FUNCTION
* @param {nAsientos} numero asientos pedidos por el cliente
* Se pide desarrollar en JavaScript la función suggest que recibe como argumento el número de asientos que se desea reservar.
* - Si el número de asientos solicitados excede el tamaño máximo de la fila, la función debe devolver un set vacío.
* - Si en ninguna fila hay suficientes asientos disponibles juntos, la función debe devolver un set vacío.
* - Se comenzará a buscar asientos juntos en la fila más lejana a la pantalla, por lo que si varias filas pudiesen albergar el número de asientos solicitado, se elegiría siempre la más lejana a la pantalla. El resultado debe ser un Set con los ids de los asientos pre-seleccionados.
*/
function suggest(nAsientos){

    let butacas = setup();
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
    logAsientos(asientos, nAsientos);
    return asientos;
}

function logAsientos(setAsientos, asientosPedidos){
    console.log("Asientos pedidos: " + asientosPedidos + " Numero de asientos: " + setAsientos.size);
    if(setAsientos.size >0){
        for(const butaca of setAsientos){
            console.log("Fila: " + Math.ceil(butaca/N) + " Columna: " + butaca%N);
        }   
    }
}

const paintSeat = (setSeats) =>{

    for(const seat of setSeats){
        let row = Math.ceil(seat/N);
        let col = seat%N;
        let table = document.getElementById("tabla-butacas");
        let rows = table.getElementsByTagName("tr");
        // console.log("Rows: ")
        // console.log(rows);
        let cells = rows[row].getElementsByTagName("td");
        // console.log("Cells: ");
        // console.log(cells);
        cells[col].classList.toggle("ocupada");
    }

}

const evalSeats = () => {
    //First let's clear the last selected seats until a final selection is made
    if(setLastSeats.size != 0){
        paintSeat(setLastSeats);
    }

    //When a change occurs this will get the new element value
    const nReqSeats = document.getElementById("n_asientos").value;

    //Get the set of requested seats!
    const setSeats = suggest(nReqSeats);
    setLastSeats = setSeats;

    paintSeat(setSeats);

}

document.addEventListener("DOMContentLoaded", () => {
    // Aquí puedes acceder al DOM sin errores
    console.log("Script cargado");

    //Link function call to change in script
    document.getElementById("n_asientos").addEventListener("change", evalSeats);

});
