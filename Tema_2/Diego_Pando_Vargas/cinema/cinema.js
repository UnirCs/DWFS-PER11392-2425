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
butacas[8][5].estado=true;
butacas[9][4].estado=true;
butacas[9][0].estado=true;
butacas[9][1].estado=true;
butacas[9][2].estado=true;
butacas[9][3].estado=true;
butacas[9][4].estado=true;
butacas[9][5].estado=true;
// Imprimir la matriz
console.log(butacas);

let resultado=suggest(5);
console.log("Los ids de asientos reservados son:", resultado)

function suggest  (numeroReserva){
    let asientos= new Set();
    let encontrados=false;
    if (numeroReserva!= null){
        if (numeroReserva>N ){
            return new Set();
        }

        for (let i = butacas.length-1; i >0 && !encontrados ; i--) {
            let asientosJuntos=0;
            asientos.clear();
            for (let j = 0; j < butacas[i].length && !encontrados; j++) {
                if (!butacas [i][j].estado){
                    asientosJuntos++;
                    if(asientosJuntos===numeroReserva){
                        encontrados=true;
                        for (let k = j+1-numeroReserva; k <=j ; k++) {
                            butacas [i][k].estado=true;
                            asientos.add(butacas [i][k].id);
                        }
                    }
                }
                else{
                    asientosJuntos=0;
                    asientos.clear();
                }

            }
        }



    }
    return asientos;
}