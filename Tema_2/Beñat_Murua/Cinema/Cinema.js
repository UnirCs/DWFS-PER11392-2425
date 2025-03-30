const N=10; //Numero de filas y  columnas

function inicializar_asientos(){
    let id=1;
    let asientos=[];
    for (i=0;i<N;i++){
        let fila=[];
        for (j=0;j<N;j++){
            fila.push({id:id,ocupado:false});
            id++;
        }
        asientos.push(fila);
    }
    return asientos;
}

let asientos=inicializar_asientos();


//Probamos a ocupar algunos de los asientos
asientos[8][1].ocupado=true;
asientos[9][5].ocupado=true;
asientos[9][3].ocupado=true;
console.log(asientos);

//Funcion para seleccionar los asientos.
function suggest(numero_asientos_solicitados){
    let set_salida=new Set();
    for (let i = asientos.length - 1; i >= 0; i--){
        let contador=0;
        for (j=0; j<asientos[i].length;j++){
            if (asientos[i][j].ocupado==false){
                contador++;
                set_salida.add(asientos[i][j].id);
                if (contador==numero_asientos_solicitados){
                    return set_salida;
                }
            }
            else{
                contador=0;
                set_salida.clear();
            }
            }
            set_salida.clear();
        }
        set_salida.clear();
        return(set_salida);
    }

//Para probar la función.
console.log(suggest(8));

