
// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    let asientos=inicializar_asientos();
    document.getElementById('input_numero_asientos').addEventListener('input', () => {
        suggest(asientos);
    });
    document.getElementById('boton_confirmar_reserva').addEventListener('click', () => {
        asientos=seleccionar_asientos(asientos);
    });
});


function inicializar_asientos(){
    const N=10; 
    let id=1;
    let asientos=[];
    for (i=0;i<4;i++){
        let fila=[];
        for (j=0;j<N;j++){
            fila.push({id:id,ocupado:false});
            id++;
        }
        asientos.push(fila);
    }
    return asientos;
}



//Funcion para seleccionar los asientos.
function suggest(asientos){
    let numero_asientos_solicitados=Number(document.getElementById('input_numero_asientos').value);
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


function seleccionar_asientos(asientos){
    let asientos_seleccionados=suggest(asientos);
    console.log('Se ha llamado a la funcion seleccionar_asientos()');
    console.log(asientos);
    let botones=document.querySelectorAll(".btn-custom")

    for (let valor of asientos_seleccionados) {
        console.log(valor);
        botones[valor-1].style.backgroundColor = "grey";
        asientos[Math.floor((valor-1)/10)][(valor-1)%10].ocupado=true;
    }
    console.log(asientos);
    return asientos;
}