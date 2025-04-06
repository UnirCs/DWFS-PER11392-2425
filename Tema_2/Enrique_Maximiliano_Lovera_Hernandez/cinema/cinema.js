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
  const lastRow = size - 1;
  const maxStartColumn = size - seatsToReserve;
  let reservedSeats = new Set();
  // Si el número de asientos solicitados excede el tamaño máximo de la fila, la función debe devolver un set vacío.
  if (seatsToReserve > size || seatsToReserve <= 0) {
    return reservedSeats;
  }

  const checkConsecutiveSeats = (row, startCol) => {
    if (startCol + seatsToReserve > size) return false;
    return !butacas[row]
      .slice(startCol, startCol + seatsToReserve)
      .some((seat) => seat.estado);
  };

  // Buscamos desde la ultima fila, asi aseguramos que devolveremos lo más alejado de la pantalla
  for (let row = lastRow; row >= 0 && reservedSeats.size == 0; row--) {
    for (let col = 0; col <= maxStartColumn; col++) {
      if (checkConsecutiveSeats(row, col)) {
        reservedSeats = new Set(
          butacas[row].slice(col, col + seatsToReserve).map((seat) => seat.id)
        );
      }
    }
  }
  return reservedSeats;
}

// modifico la ultima fila para reservar un asiento y probar el funcionamiento
butacas[butacas.length - 1][
  butacas[butacas.length - 1].length - 1
].estado = false;

console.log(butacas);
console.log(suggest(1));
