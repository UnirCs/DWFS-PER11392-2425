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
function ValidarCantidadAsientos(numAsientos) {
  if (numAsientos > N) {
    return false;
  }
  return true;
}
function suggest(numAsientos) {
  let seReservoAsientos = false; // Variable para verificar si se reservaron asientos
  let butacasSeleccionadas = []; // Array para almacenar los asientos seleccionados
  if (!ValidarCantidadAsientos(numAsientos)) {
    console.log("No hay suficientes asientos disponibles.");
    return [];
  }
  // Recorrer la matriz de butacas desde la última fila hacia la primera
  for (let i = N - 1; i >= 0 && !seReservoAsientos; i--) {
    let asientosDisponibles = 0;
    // Recorrer la fila de derecha a izquierda
    for (let j = 0; j < N && !seReservoAsientos; j++) {
      if (butacas[i][j].estado === false) {
        asientosDisponibles++;
      } else {
        asientosDisponibles = 0; // Reiniciar el contador si encontramos un asiento reservado
      }

      if (asientosDisponibles === numAsientos) {
        AgregarAsientos(numAsientos, i, j);
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

  return console.log("Asientos sugeridos:", butacasSeleccionadas); // Imprimir los asientos sugeridos
}
function AgregarAsientos(numAsientos, fila, columna) {
  // Reservar asientos
  for (let k = columna - numAsientos + 1; k <= columna; k++) {
    butacas[fila][k].estado = true; // Cambiar el estado a reservado
    butacasSeleccionadas.push(butacas[fila][k].id); // Agregar el ID del asiento reservado
  }
}
