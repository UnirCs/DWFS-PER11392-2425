// Definir el tamaño de la matriz de butacas
const N = 10;

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1
    let butacas = [];
    for (let i = 0; i < N; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < N; j++) {
            if (i % 2 !== 0) {
                fila.push({
                    id: idContador++,
                    estado: true // Estado inicial ocupado
                });
            } else {
                // Nuevo asiento
                fila.push({
                    id: idContador++,
                    estado: false // Estado inicial libre
                });
            }
        }
        butacas.push(fila);
    }
    return butacas;
}


function suggest(butacas, asientos) {
    let resultado = new Set();
    // cada fila tiene el mismo numero de asientos, por lo que si el numero de asientos seleccionados es mayor 
    // que el length de cualquier fila entonces retornamos un set vacio
    if (asientos > butacas[0].length) {
        return resultado;
    }
    // recorremos las filas empezando por la ultima e iteramos mientras no se haya encontrado un resultado
    for (let i = butacas.length - 1; i >= 0 && resultado.size === 0; i--) {
        // obtenemos cada fila
        const fila = butacas[i];
        // recorremos los grupos de asientos, siempre y cuando no se haya encontrado un resultado,  
        // de acorde a la cantidad especificada por el usuario dentro de cada fila excluyendo las posiciones 
        // donde no es posible seleccionar un bloque de asientos debido a la cantidad especificada
        for (let j = 0; j <= fila.length - asientos && resultado.size === 0; j++) {
            const grupoAsientos = fila.slice(j, j + asientos); // obtenemos un grupo de asientos

            // evaluamos si cada uno de los asientos dentro del grupo esta disponible y de ser asi guardamos el set
            // como el resultado
            if (grupoAsientos.every(asiento => !asiento.estado)) {
                resultado = new Set(grupoAsientos.map(asiento => asiento.id));
            }
        }
    }

    // retornamos el resultado
    return resultado;
}


// Inicializar la matriz
let butacas = setup();
// Imprimir la matriz
console.log(butacas);
let resultado = suggest(butacas, 12);
// debe retornar set vacio
console.log('SET VACIO:', resultado);
// // debe retornar los ids de los asientos preseleccionados
resultado = suggest(butacas, 2);
console.log('ASIENTOS RESERVADOS', resultado);