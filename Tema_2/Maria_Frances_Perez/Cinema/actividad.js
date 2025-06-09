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

function suggest(NAsientos) {
  let Asientos = new Set();
  let AsientosAux = new Set();
  let cont = 0;
  if (NAsientos < butacas.length) {
    //El número de asientos es menor que la fila
    for (let i = butacas.length - 1; i >= 0; i--) {
      if (AsientosAux.size < NAsientos) {
        for (let j = 0; j < butacas[i].length; j++) {
          if (AsientosAux.size < NAsientos) {
            if (butacas[i][j].estado == false) {
              AsientosAux.add(butacas[i][j].id);
            } else {
              AsientosAux = Set();
            }
          }
        }
      }
    }
    Asientos = AsientosAux;
  }

  return Asientos;
}

// Inicializar la matriz
let butacas = setup();

// Imprimir la matriz
console.log(butacas);

ButacasLibres = suggest(3);
