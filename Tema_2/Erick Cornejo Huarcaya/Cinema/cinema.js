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
const butacas = setup();

// Imprimir la matriz
console.log(butacas);

function suggest(asientosSolicitados)
{
    let filas=butacas.length-1;
    let asientosVenta= new Set();
     while( filas>=0 && asientosSolicitados<=butacas[filas].length  && asientosVenta.size!=asientosSolicitados )
    {   
        let a=0;
        asientosVenta.clear();
        while (a<butacas[filas].length && asientosVenta.size!=asientosSolicitados )
        {
            if (butacas[filas][a].estado)//ocupado
                asientosVenta.clear();
            else
                asientosVenta.add(butacas[filas][a].id);
            a++;
        }

        filas--;
    }
    return asientosVenta;
}

//Comprobacion 
const asientos= suggest(11);
console.log("asientos juntos encontrados: " + [...asientos]); //vacío por exceder el número de asientos

//ocupando asientos en la última fila
butacas[9][1].estado=true;
butacas[9][2].estado=true;
butacas[9][3].estado=true;
butacas[9][4].estado=true;

const asientosLejano= suggest(8);
console.log("asientos juntos encontrados: " + [...asientosLejano]); //solicitando 8 asientos, la última fila no cuenta con asientos disponibles, por tanto trae la novena fila  81,82,83,84,85,86,87,88