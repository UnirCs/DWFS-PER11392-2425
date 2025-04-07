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
    console.log("butacas inicializadas");
    return butacas;
}

// Inicializar la matriz
const butacas = setup();
 

function suggest( )
{
    let asientosSolicitados=document.getElementById("txtNumAsientos").value;
    console.log(asientosSolicitados);
    let filas=butacas.length-1;
    let asientosVenta= new Set();
    let encontrado=false;
     while(asientosSolicitados>0 && filas>=0 && asientosSolicitados<=butacas[filas].length  && asientosVenta.size<asientosSolicitados )
    {  
        let a=0;
        asientosVenta.clear();
        while (a<butacas[filas].length && encontrado===false )
        {
            if (butacas[filas][a].estado && asientosVenta.size>=asientosSolicitados)//ocupado
            {
                encontrado=true
            }
            else if (butacas[filas][a].estado && asientosVenta.size<asientosSolicitados)//ocupado
            {
                encontrado=false
                asientosVenta.clear();
            }
            else
                asientosVenta.add(butacas[filas][a].id);
            a++;
        }

        filas--;
    }
    console.log("asientos juntos encontrados: " + [...asientosVenta]); 
    return asientosVenta;
}

    //ocupando asientos en la última fila
    butacas[9][1].estado=true;
    butacas[9][2].estado=true;
    butacas[9][3].estado=true;
    butacas[9][4].estado=true;
