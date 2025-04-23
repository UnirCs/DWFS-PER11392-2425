// Definir el tamaño de la matriz de butacas
const F = 5; // Número de filas
const L = 10;  // Número de columnas
// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];
    for (let i = 0; i < F; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < L; j++) {
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
console.log('Butacas Inicializadas');
//luisgre
const lstbutacas = document.querySelector("#lstbutacas");
const reserva = document.querySelector("#reserva");
/* Código ejercicio 2 Comentado para cambiar por Input*/
/*reserva.addEventListener("submit", e => {
    e.preventDefault();
    console.log(suggest(Number(lstbutacas.value)));
})*/
/* Código ejercicio 3 utilizando Input
function fnOnInput(){
    let nOnInput = document.getElementById("lstbutacas").value;
    let returno = suggest(nOnInput);
    document.getElementById("resultado").innerHTML = [...returno];
}*/

/* Código ejercicio 4 */
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('reserva');
    const input = document.getElementById('lstbutacas');
    input.addEventListener('input', function () {
        const valor = parseInt(input.value, 10);
        const resultado = suggest(valor);
        document.getElementById('resultado').innerHTML = [...resultado];
        const butacasOcupadas = document.querySelectorAll('.butacaOcupada');
        butacasOcupadas.forEach(butaca => {
            butaca.classList.remove('butacaOcupada');
        });
        resultado.forEach(id => {
            const butaca = document.querySelector('#reserva').querySelector(`[id="${id}"]`);
            if (butaca) {
                butaca.classList.add('butacaOcupada');
            }
        });
    });
});

function suggest(buscaButacas) {
    /*Set de retorno*/
    let returnSet = new Set();
    /*Si el número de asientos solicitados excede el tamaño máximo de la fila, la función debe devolver un set vacío.*/
    if (buscaButacas === 0 || buscaButacas > L) returnSet = new Set();
    /*Si en ninguna fila hay suficientes asientos disponibles juntos, la función debe devolver un set vacío.*/
    let buscaButacasTmp = buscaButacas;
    for (let i = butacas.length-1; i >= 0; i--) {
        let columna = butacas[i];
        if(columna.filter(butaca => butaca.estado === false).length >= buscaButacas){
            /*Se comenzará a buscar asientos juntos en la fila más lejana a la pantalla,
            por lo que si varias filas pudiesen albergar el número de asientos solicitado,
            se elegiría siempre la más lejana a la pantalla.
            El resultado debe ser un Set con los ids de los asientos pre-seleccionados.*/
            let columna = butacas[i];
            for (let j = columna.length-1; j >= 0; j--) {
                let detail = columna[j];
                if (!detail.estado  && buscaButacasTmp > 0) {
                    returnSet.add(detail.id);
                    detail.estado = true;
                    buscaButacasTmp--;
                }
            }
        }
    }
    console.log('*** Asientos sugeridos: ' + [...returnSet]);
    return returnSet;
}