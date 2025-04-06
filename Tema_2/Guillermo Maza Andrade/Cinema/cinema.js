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

function suggest(numAsientos) {
  let asientosSugeridos = []; // Array para almacenar los asientos sugeridos
  let seReservoAsientos = false; // Variable para verificar si se reservaron asientos
  let butacasSeleccionadas = []; // Array para almacenar los asientos seleccionados
  if (numAsientos > N) {
    console.log("No hay suficientes asientos disponibles.");
    return [];
  }
  for (let i = N - 1; i >= 0 && !seReservoAsientos; i--) {
    let asientosDisponibles = 0;
    for (let j = 0; j < N && !seReservoAsientos; j++) {
      if (butacas[i][j].estado === false) {
        asientosDisponibles++;
      } else {
        asientosDisponibles = 0; // Reiniciar el contador si encontramos un asiento reservado
      }
      if (asientosDisponibles === numAsientos) {
        // Reservar asientos
        for (let k = j - numAsientos + 1; k <= j; k++) {
          butacas[i][k].estado = true; // Cambiar el estado a reservado
          butacasSeleccionadas.push(butacas[i][k].id); // Agregar el ID del asiento reservado
        }
        seReservoAsientos = true;
      }
    }
  }
  if (!seReservoAsientos) {
    console.log(
      "No se pudo reservar. No hay suficientes asientos disponibles."
    );
    return [];
  }
  return butacasSeleccionadas; // Retornar la matriz actualizada
}

// Reservar asientos para la prueba
for (let i = 0; i < N; i++) {
  butacas[i][0].estado = true;
  butacas[i][2].estado = true;
  //   butacas[i][4].estado = true;
  //   butacas[i][6].estado = true;
}

// Imprimir la matriz
console.log("Butacas: ", butacas);
let numAsientos = 7; // Número de asientos juntos a reservar
let resultado = suggest(numAsientos); // Obtener asientos sugeridos

console.log("Asientos sugeridos:", resultado); // Imprimir los asientos sugeridos
