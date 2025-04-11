document.addEventListener('DOMContentLoaded', () => {
     document.getElementById('txtNumAsientos').addEventListener('change', marcarButaca);

});

const N = 10; // Número de filas y columnas

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];

    for (let i = 0; i < N; i++) {
        // Nueva fila
        let fila = [];
        let tableFila = document.createElement('tr');
            let celdaTitulo=document.createElement('td');
            celdaTitulo.innerHTML='Fila '+ (i+1);
             tableFila.appendChild(celdaTitulo );
        for (let j = 0; j < N; j++) {
            let tableCelda=  document.createElement('td');
            let butaca = document.createElement('input');
            butaca.type='checkbox';
            butaca.id='butaca_'+(idContador-1);
            butaca.className='asiento';
            tableCelda.appendChild(butaca);
            tableFila.appendChild(tableCelda);

            // Nuevo asiento
            fila.push({
                id: idContador++,
                estado: false // Estado inicial libre
            });
        }
        document.getElementById('table-butacas').appendChild(tableFila);
        butacas.push(fila);
    }
    console.log("butacas inicializadas");
    return butacas;
}

// Inicializar la matriz
const butacas = setup();
 
function marcarButaca()
{
    let butacas=suggest();
    butacas.forEach((a) =>{
        document.getElementById('butaca_'+a).className = 'seleccionado';
    })
}
function suggest( )
{
    clear();
    let asientosSolicitados=document.getElementById("txtNumAsientos").value;
    console.log(asientosSolicitados);
    let filas=butacas.length-1;
    let asientosVenta= new Set();
    let encontrado=false;
    while( filas>=0 && asientosSolicitados<=butacas[filas].length  && asientosVenta.size!=asientosSolicitados )
    {   
        let a=0;
        asientosVenta.clear();
        while (a<butacas[filas].length && asientosVenta.size!=asientosSolicitados )
        {
            if (butacas[filas][a].estado)//ocupado
                asientosVenta.clear();
            else
                asientosVenta.add(butacas[filas][a].id-1);
            a++;
        }

        filas--;
    }
    return asientosVenta;
}
function clear()
{
    for (let i = 0; i < N; i++) {
         for (let j = 0; j < N; j++) {            
            if (butacas[i][j].estado==true)
            {
                document.getElementById('butaca_'+(butacas[i][j].id - 1)).className = 'ocupado';
                console.log((butacas[i][j].id - 1) +' ocup');

            }
            else
            {
                document.getElementById('butaca_'+(butacas[i][j].id - 1)).className = 'asiento';
                //console.log((butacas[i][j].id - 1) +' libre');
            }
        }
    }
}
    //ocupando asientos en la última fila
    butacas[9][1].estado=true;
    butacas[9][2].estado=true;
    butacas[9][3].estado=true;
    butacas[9][4].estado=true;
    clear();
