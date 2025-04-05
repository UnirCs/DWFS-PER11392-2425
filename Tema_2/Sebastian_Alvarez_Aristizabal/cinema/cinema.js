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


function suggestSeats(numberOfSeats, butacas){
     if(numberOfSeats < butacas.length && numberOfSeats > 0){
        return verifyRows(numberOfSeats, butacas);
        }
    return [];
 }
 
function verifyRows(numberOfSeats, butacas){
     let selectedSeats = [];
         for(rows of butacas.reverse()){
            if(selectedSeats.length < numberOfSeats ){
                selectedSeats = [];
                }
           for(seat of rows){
            if(seat.estado === false){
                if (selectedSeats.length < numberOfSeats && selectedSeats.length !== 0){
                      const lastSeat = selectedSeats[selectedSeats.length - 1];
                      if(seat.id - lastSeat === 1 && seat.estado === false){
                         selectedSeats.push(seat.id);
                         seat.estado = true;
                     }
                  }
                     if(selectedSeats.length === 0){
                          selectedSeats.push(seat.id);
                          seat.estado = true;
                      }
                 }
           }
         }
         return selectedSeats;
     }

     


// Inicializar la matriz
let butacas = setup();
console.log(suggestSeats(4,  butacas));

// Imprimir la matriz
// console.log(butacas);

