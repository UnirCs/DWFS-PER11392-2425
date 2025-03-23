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
        estado: false, // Estado inicial libre
      });
    }
    butacas.push(fila);
  }
  return butacas;
}

// Inicializar la matriz
const butacas = setup();

// Imprimir la matriz

function suggest(seatsToReserve) {
  const size = butacas.length;
  // proteccion en caso que intentemos reservar un numero mayor que el total de butacas.
  if (seatsToReserve <= size) {
    // buscamos desde el final de nuestra matriz de butacas, osea en la ultima row
    for (let row = size - 1; row >= 0; row--) {
      let count = 0;
      let butacaInicial = -1;

      for (let col = 0; col < size; col++) {
        if (butacas[row][col].estado) {
          count = 0;
          butacaInicial = -1;
        } else {
          if (count === 0) {
            butacaInicial = col; // agarramos la posicion de la primera columna que estamos encontrando con un asiento libre
          }
          count++;
          if (count === seatsToReserve) {
            const getButacasIds = butacas[row]
              .slice(butacaInicial, butacaInicial + seatsToReserve)
              .map((seat) => seat.id);
            return new Set(getButacasIds);
          }
        }
      }
    }
  }
  return new Set();
}

// modifico la ultima fila para reservar un asiento y probar el funcionamiento
butacas[butacas.length - 1][
  butacas[butacas.length - 1].length - 1
].estado = true;

console.log(butacas);
console.log(suggest(10));
