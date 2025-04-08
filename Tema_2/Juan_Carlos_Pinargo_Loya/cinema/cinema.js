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

function suggest(numAsientos) {
    const reservas = new Set();
    let filaLibres = [];

    for (let i = 0; i < butacas.length; i++) {
        let contPorFila = 0;
        let butacaLibre = [];

        for (let j = 0; j < butacas[i].length; j++) {
            if (butacas[i][j].estado === false) {//valido asientos libres
                contPorFila++;
                butacaLibre.push(butacas[i][j]);
            }
        }
        filaLibres.push({i, contPorFila, butacaLibre});// en esta fila hay estos asientos libres
    }

    let bandera = false;
    for (let i = 0; i < filaLibres.length; i++) {//valido asiento libres por fila
        if (bandera === false && (numAsientos > filaLibres[i].contPorFila && filaLibres[i].contPorFila > 0)) {// si excede el numero de asientos disponibles
            reservas.clear();
            bandera = true; //si falla detengo la validacion
            console.log("En la fila " + i + " no se encontraron " + numAsientos + " asientos disponibles, existen solo " + filaLibres[i].contPorFila);
        } else if (bandera === false && numAsientos <= filaLibres[i].contPorFila) { // valido si existe una cantidad de asientos necesarios
            let contSecuencia = 0;
            for (let j = 0; j < numAsientos; j++) {//recorro mis asientos
                if (reservas.size < numAsientos) {

                    let a = filaLibres[i].butacaLibre[j].id;
                    let b = filaLibres[i].butacaLibre[j + 1].id;
                    //valido si hay sientos juntos
                    if (b - a !== 1) {// en base al id determino si estan juntos - son consecutivos
                        contSecuencia++;
                    }
                    if (contSecuencia > 0) {
                        reservas.clear();
                        bandera = true; //si no estan juntos detengo la validacion
                    } else {
                        reservas.add(filaLibres[i].butacaLibre[j].id);
                        filaLibres[i].butacaLibre[j].estado = true; //cambio estado asiento
                        filaLibres[i].contPorFila -= 1; //resto cantidad existente ocupado
                        bandera = true; //si ya encontro respuesta detengo la validacion
                    }
                }
            }
            if (contSecuencia === 0)
                console.log("En la fila " + i + " se encontraron " + numAsientos + " asientos disponibles ");
            else
                console.log("En la fila " + i + " no se econtraron asientos juntos disponibles ");
        }
    }
    return reservas;
}

//OCUPO LA PRIMERA FILA
butacas[0][0].estado = true; //asiento 0,0 ocupado
butacas[0][1].estado = true; //asiento 0,1 ocupado
butacas[0][2].estado = true; //asiento 0,2 ocupado
butacas[0][3].estado = true; //asiento 0,3 ocupado
butacas[0][4].estado = true; //asiento 0,4 ocupado
butacas[0][5].estado = true; //asiento 0,5 ocupado
butacas[0][6].estado = true; //asiento 0,6 ocupado
butacas[0][7].estado = true; //asiento 0,7 ocupado
butacas[0][8].estado = true; //asiento 0,8 ocupado
butacas[0][9].estado = true; //asiento 0,9 ocupado

//RESERVO 5 ASIENTOS
let reservaAsientos = suggest(5);
console.log(reservaAsientos);

// OCUPO 2 ASIENTOS MAS
butacas[1][1].estado = true; //asiento fila 1, 1 ocupado
butacas[1][2].estado = true; //asiento fila 1, 2 ocupado
// RESERVO 4 ASIENTOS MAS
let asientosJuntos = suggest(4);
console.log(asientosJuntos);

// OCUPO 1 ASIENTOS MAS
butacas[2][2].estado = true; //asiento 2,2 ocupado
// DESEO RESERVAR 2 ASIENTOS MAS SE PRESENTA ALERTA
let excesoAsientos = suggest(2);
console.log(excesoAsientos);

//Inicializo nuevamente la matriz
butacas = setup();
butacas[0][5].estado = true; //asiento fila 0, 5 ocupado
butacas[0][6].estado = true; //asiento fila 0, 6 ocupado
butacas[0][7].estado = true; //asiento fila 0, 7 ocupado
let noAsientosJuntos = suggest(6);
console.log(noAsientosJuntos);