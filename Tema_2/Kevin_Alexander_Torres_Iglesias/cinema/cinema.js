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

// Inicializar la matriz
let butacas = setup();

// Imprimir la matriz
console.log(butacas);

// Función que recomienda las butacas
function suggest(asientos){
  let result = new Set();

  if (asientos > butacas.length){
    return result;
  }

  for (let i = butacas.length - 1; i >= 0; i--) {
    let asientosDisponiblesEnFila = 0;
    for (let j = 0; j < butacas[i].length; j++) {
      if (!butacas[i][j].estado) {
        asientosDisponiblesEnFila++;
      } else {
        asientosDisponiblesEnFila = 0;
      }
      if (asientosDisponiblesEnFila >= asientos){
        for (let k = j; k > j - asientos; k--) {
          result.add(butacas[i][k].id);
        }
        return result;
      }
    }
  }

  return result;

}