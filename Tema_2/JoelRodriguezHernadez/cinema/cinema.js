// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

// Función para inicializar la matriz de butacas
function inicializarButacas() {
	let contadorId = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
	let butacas = []; // Array que contendrá las filas de butacas

	for (let filaIndex = 0; filaIndex < N; filaIndex++) {
		// Nueva fila
		let fila = [];
		for (let asientoIndex = 0; asientoIndex < N; asientoIndex++) {
			// Nuevo asiento
			fila.push({
				id: contadorId++, // Asignar ID único a cada asiento
				estado: false, // Estado inicial libre
			});
		}
		butacas.push(fila); // Añadir la fila de butacas al array principal
	}
	return butacas; // Retornar la matriz de butacas
}

// Inicializar la matriz de butacas
let butacas = inicializarButacas(); // Llamar a la función para obtener la matriz de butacas

// Función para sugerir asientos disponibles
function sugerirAsientos(asientosASolicitar) {
	const tamaño = butacas.length; // Tamaño de la matriz
	const ultimaFila = tamaño - 1; // Índice de la última fila
	const columnaMaximaInicio = tamaño - asientosASolicitar; // Columna máxima para empezar a buscar
	let asientosReservados = new Set(); // Conjunto para almacenar los IDs de los asientos reservados

	// Si el número de asientos solicitados excede el tamaño máximo de la fila, devolver un set vacío
	if (asientosASolicitar > tamaño || asientosASolicitar <= 0) {
		return asientosReservados; // Retornar conjunto vacío
	}

	// Función interna para verificar asientos consecutivos disponibles
	const verificarAsientosConsecutivos = (fila, inicioColumna) => {
		if (inicioColumna + asientosASolicitar > tamaño) return false; // Salir si no hay suficiente espacio
		return !butacas[fila]
			.slice(inicioColumna, inicioColumna + asientosASolicitar) // Obtener subarray de asientos
			.some((asiento) => asiento.estado); // Comprobar si algún asiento está ocupado
	};

	// Buscamos desde la última fila, asegurando que devolveremos lo más alejado de la pantalla
	for (
		let fila = ultimaFila;
		fila >= 0 && asientosReservados.size === 0;
		fila--
	) {
		for (let columna = 0; columna <= columnaMaximaInicio; columna++) {
			// Verificar si hay suficientes asientos libres
			if (verificarAsientosConsecutivos(fila, columna)) {
				// Si hay asientos libres
				asientosReservados = new Set(
					butacas[fila]
						.slice(columna, columna + asientosASolicitar)
						.map((asiento) => asiento.id)
				);
			}
		}
	}
	return asientosReservados; // Retornar el conjunto con los IDs de los asientos reservados
}

// Modificar algunos asientos para probar el funcionamiento
butacas[5][7].estado = true;
butacas[9][6].estado = true;
butacas[9][7].estado = true;

// Imprimir la matriz de butacas en la consola
console.log(butacas);


const cantidadDeAsientosSolicitados = 4;
const asientosSugeridos = sugerirAsientos(cantidadDeAsientosSolicitados);
console.log(
	`Asientos sugeridos para reservar (${cantidadDeAsientosSolicitados}):`,
	[...asientosSugeridos]
);
