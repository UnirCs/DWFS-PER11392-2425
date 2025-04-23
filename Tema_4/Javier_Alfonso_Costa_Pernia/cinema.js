document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("cantidadasientos").value = 0;
    estadoAsientos();
    document.getElementById('cantidadasientos').addEventListener('input', estadoAsientos);

});

function estadoAsientos(){
    let ca = document.getElementById("cantidadasientos").value;

    if (ca != null && ca >= 0){
        let seleccionadas = ca > 0 ? suggest(parseInt(ca)) : getReservedChairsFromSetup();
        if (seleccionadas != null && seleccionadas.length >= 0){
            let allDivs = document.getElementsByTagName("div");
            const divs = getSelectedItemsFilteringByProperty(allDivs, "className", "silla,reservada");

            for(let i=0; i < divs.length; i++){
                let seleccionado = seleccionadas.find(sel => sel === parseInt(i+1));
                if(seleccionado !== undefined && seleccionado !== null){
                    onDisponible(divs[i],false);
                }
                else{
                    onDisponible(divs[i],true);
                }
            }
        }
    }
    else{
        alert("La cantidad de asientos debe ser mayor o igual a cero");
        document.getElementById("cantidadasientos").value = 0;
    }
}
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
            if(i === 9 && j > 4) {
                fila.push({
                    id: idContador++,
                    estado: true // Estado inicial libre
                });
            }
            else if(i === 8 && j > 5) {
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
    return finalSelection;
}

function getReservedChairsFromSetup(){
    let butacas = setup();
    return getSelectionIdsFilteringByProperty(butacas, "estado", true);
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

function getSelectedItemsFilteringByProperty(array, valProp, value){
    let filtered = [];
    let values = value.split(',');
    let contador = 1;
    for(let i = 0; i < array.length; i++){
        let item = array[i];
        if(values.includes(item[valProp])){
            item.id = contador;
            filtered.push(item);
            contador++;
        }
    }
    return filtered;
}

function onDisponible(node, disponible){
    if (disponible === true){
        node.className = node.className.replace('reservada','silla');
    }
    else{
        node.className = node.className.replace('silla','reservada');
    }
}

// Inicializar la matriz
//let butacas = setup();
// Imprimir la matriz
//console.log(butacas);

/*let optionN = 1;

switch (optionN) {
    case 1: suggest(3, butacas); break;
    case 2: console.log(setup()); break;
    default: //ejemplo();
}*/
