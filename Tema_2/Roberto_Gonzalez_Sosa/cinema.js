

// Función para inicializar la matriz de butacas.
// Lo modifico para poder definir aleatoriamente asientos ocupados.
function setup(N, ocupados) {
    // Validar que no se pida ocupar más asientos de los disponibles
    const totalAsientos = N * N;
    if (ocupados > totalAsientos) {
        throw new Error('Número de asientos ocupados supera el total de asientos');
    }

    let idContador = 1;
    let butacas = [];

    // Crear matriz de asientos
    for (let i = 0; i < N; i++) {
        let fila = [];
        for (let j = 0; j < N; j++) {
            fila.push({
                id: idContador++,
                estado: false // Inicialmente todos libres
            });
        }
        butacas.push(fila);
    }

    // Distribuir asientos ocupados aleatoriamente
    let ocupadosColocados = 0;
    while (ocupadosColocados < ocupados) {
        // Generar coordenadas aleatorias
        const filaAleatoria = Math.floor(Math.random() * N);
        const asientoAleatorio = Math.floor(Math.random() * N);

        // Verificar si el asiento ya está ocupado
        if (!butacas[filaAleatoria][asientoAleatorio].estado) {
            butacas[filaAleatoria][asientoAleatorio].estado = true;
            ocupadosColocados++;
        }
    }

    return butacas;
}

function suggest(butacas, numero_asientos) {
    let res = [];
    if (numero_asientos <= 0 || numero_asientos > butacas[0].length) {
        return res;
    }

    for (let i = butacas.length-1; i >= 0 && numero_asientos !== res.length; i--) {
        for (let j = 0; j <= butacas[i].length - numero_asientos; j++) {
            const seats = butacas[i].slice(j, j + numero_asientos);
            if (seats.every(seat => !seat.estado)) {
                res = seats.map(seat => seat.id);
            }
        }
        console.log("iteracion número: "+i);
    }
    return res;
}

// Inicializar la matriz
let butacas = setup(10, 70);

// Imprimir la matriz
console.log(butacas);
console.log(suggest(butacas, 4));