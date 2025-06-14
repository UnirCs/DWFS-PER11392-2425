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

function suggest(asientosReserva, butacas){
    let asientosLibres = [];
    let v = 0;
    let i = butacas.length - 1;
    let j = 0;
    let assigned = false;
    if(asientosReserva <= N){

        //fila
        while(i > 1 && !assigned){
            //silla
            j = 0;
            v = 0;
            while (j < butacas[i].length && !assigned){
                //Validamos estado de la silla
                if(!butacas[i][j].estado){
                    //validar si la cantidad de sillas consecutivas corresponde a la cantidad de asientos solicitados
                    if(v <= asientosReserva){
                        v++;
                    }
                    if(v === asientosReserva){
                        let contadorSet = j - (asientosReserva - 1) ;
                        for (let k = 0; k < asientosReserva; k++){
                            asientosLibres.push(butacas[i][contadorSet]);
                            contadorSet++;
                        }
                        assigned = true;
                    }
                } else {
                    //si la silla está ocupada debe volver a 0
                    v = 0;
                    asientosLibres = [];
                }

                j++;
            }

            i--;
        }
        return asientosLibres;
    }else{
        return asientosLibres;
    }
}

// Inicializar la matriz
const butacas = setup();

let botonReservar = document.getElementById("reservar");

botonReservar.addEventListener("click", clickReservar);

function clickReservar(){
    let inputNumSeats = document.querySelector("#numSeats").value;
    let asientosReservados = suggest(parseInt(inputNumSeats), butacas);
    let result = asientosReservados.map(asiento => asiento.id).join()
    console.log("Asientos sugeridos",result);
}
