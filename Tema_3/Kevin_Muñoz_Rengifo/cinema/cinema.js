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
                estado: Math.random() > 0.5 // Estado inicial libre
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

// Inicializar la matriz
let butacas = setup();
console.log('Butacas inicializadas');

// Funcion de reserva
const suggest = (numeroAsientos) => {
  const recomendados = []
  for (let fila = butacas.length - 1; fila > 0 && recomendados.length != numeroAsientos; fila--) {
    recomendados.length = 0 // Reiniciar la lista de recomendados para cada fila
    for (let asiento = butacas.length - 1; asiento > 0 && recomendados.length != numeroAsientos; asiento--) {
      if (!butacas[fila][asiento].estado) {
        recomendados.push(butacas[fila][asiento].id)
      } else {
        recomendados.length = 0 // Reiniciar la lista si encuentra un ocupado
      }
    }
  }

  const resultado = recomendados.length == numeroAsientos ? recomendados : []
  console.log('Asientos sugeridos:', resultado.join(', '))
  return recomendados.length === numeroAsientos ? recomendados : []
}
