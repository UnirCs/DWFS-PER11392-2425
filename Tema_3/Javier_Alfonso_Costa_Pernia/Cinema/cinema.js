// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas
//let butacas = setup();
// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacasSetup = [];

    for (let i = 0; i < N; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < N; j++) {
            /*if(i > 7 && j > 4) {
                fila.push({
                    id: idContador++,
                    estado: true // Estado inicial libre
                });
            }
            else{*/
                // Nuevo asiento
                fila.push({
                    id: idContador++,
                    estado: false // Estado inicial libre
                });
            //}

        }
        butacasSetup.push(fila);
    }
    return butacasSetup;
}

function suggest(selected) {
    let butacas = setup();
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
    let finalSelection = getSelectionIdsFilteringByProperty(butacas, "estado", true);
    return console.log("Asientos sugeridos: " + finalSelection.join());
}

function getSelectionIdsFilteringByProperty(array, valProp, value){
    let filtered = [];
    for(let i = 0; i < array.length; i++){
        let obj = array[i];
        for(let key in obj){
            if(typeof(obj[key] === "object")){
                let item = obj[key];
                if(item[valProp] === value){
                    filtered.push(item["id"]);
                }
            }
        }
    }
    return filtered;
}