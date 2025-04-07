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
//asientos[8][1].ocupado=true;
//asientos[9][5].ocupado=true2;
//asientos[9][3].ocupado=true;
//console.log(asientos);

//Funcion para seleccionar los asientos.
function suggest(numero_asientos_solicitados){
    const N=10;
    let asientos=inicializar_asientos();

    let set_salida=new Set();
    for (let i = asientos.length - 1; i >= 0; i--){
        for (j=0; j<asientos[i].length;j++){
            if(set_salida.size!=numero_asientos_solicitados){//Si no se han encontrado los asientos todavia, se buscan.
                if (asientos[i][j].ocupado==false){
                    set_salida.add(asientos[i][j].id);
                    console.log(set_salida.size);
                    console.log(numero_asientos_solicitados);
                }
                else {
                    set_salida.clear();
                }    
            }
        }
        if(set_salida.size!=numero_asientos_solicitados){ //Si al cambiar de linea no se han encontrado asientos, se elimina datos de set_salida
            set_salida.clear();
        }
    }
    console.log(set_salida);
    return set_salida;
}
//Para probar la función.
console.log(suggest(9));
