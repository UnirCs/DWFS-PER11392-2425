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

function suggest(seatsRequested) {
  let suggestSeats = [];
  const numRows = butacas.length;
  const numCols = butacas[0].length;
  let foundSuggest = false;

  if (seatsRequested > numCols) return suggestSeats;

  let i = numRows - 1;
  while (i >= 0 && !foundSuggest) {
    let row = butacas[i];
    let acum = 0;
    let index = -1;
    let j = 0;

    while (j < numCols && !foundSuggest) {
      if (!row[j].estado) {
        if (acum === 0) index = j;
        acum++;

        if (acum === seatsRequested) {
          let k = index;

          while (k < index + seatsRequested) {
            suggestSeats.push(row[k].id);
            k++;
          }

          foundSuggest = true;
        }
      } else {
        acum = 0;
        index = -1;
      }
      j++;
    }
    i--;
  }
  return suggestSeats;
}

// Inicializar la matriz
let butacas = setup();

// Ocupar algunos asientos
butacas[9][0].estado = true;
butacas[9][1].estado = true;
butacas[9][2].estado = true;
butacas[9][3].estado = true;
butacas[8][0].estado = true;
butacas[8][3].estado = true;
butacas[8][6].estado = true;
butacas[7][1].estado = true;
butacas[7][2].estado = true;
butacas[7][3].estado = true;
butacas[0][3].estado = true;
butacas[0][6].estado = true;
butacas[0][9].estado = true;

// Imprimir la matriz
console.log(butacas);

// Sugerir x asientos
console.log('Asientos sugeridos: ' + suggest(9).join(','));
