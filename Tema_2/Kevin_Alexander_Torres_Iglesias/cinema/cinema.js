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
let butacas = setup();

// Imprimir la matriz
console.log(butacas);

// Función que recomienda las butacas
function suggest(asientos) {
  let result = new Set();
  let encontrado = false;

  if (asientos <= butacas.length) {
    for (let i = butacas.length - 1; i >= 0 && !encontrado; i--) {
      let asientosDisponiblesEnFila = 0;

      for (let j = 0; j < butacas[i].length; j++) {
        if (!butacas[i][j].estado) {
          asientosDisponiblesEnFila++;
        } else {
          asientosDisponiblesEnFila = 0;
        }

        if (asientosDisponiblesEnFila >= asientos) {
          result.clear();
          for (let k = j - asientos + 1; k <= j; k++) {
            result.add(butacas[i][k].id);
          }
          encontrado = true;
        }
      }
    }
  }

  return result;
}

function testSuggest() {
  butacas[0][0].estado = true;
  butacas[0][1].estado = true;
  butacas[1][0].estado = true;
  butacas[1][1].estado = true;

  console.log("Sugerencia para 2 asientos:", suggest(2));
  console.log("Sugerencia para 3 asientos:", suggest(3));
  console.log("Sugerencia para 4 asientos:", suggest(4));
}

testSuggest();
