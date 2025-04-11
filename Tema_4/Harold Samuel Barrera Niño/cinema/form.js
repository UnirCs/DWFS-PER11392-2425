//Datos del formulario (los que se estan usando)
const userClave = document.getElementsByName("user_clave");
const userClaveConfirmar = document.getElementsByName("user_clave_confirmar");
const mensajeError = document.getElementById("error_msg");

//Funcion principal de inicio de sesion. Retorna false para prevenir el comportamiento por defecto de los form
function loginAndRedirect(){

    const clave = userClave[0].value
    const claveConfirmar = userClaveConfirmar[0].value
    
    console.log(clave);

    if(!validarClave(clave, claveConfirmar)){
        mostrarMensajeError("La clave debe tener 8 caracteres minimo, debe tener letras y numeros y debe ser igual a la clave de confirmacion.");
        return false;
    }

    window.location.href = "index.html";
    return false;
}

function validarClave(clave, claveConfirmar){

    const tieneLetrasYNumeros = /^[A-Za-z0-9]*$/.test(clave);

    //La clave y la confirmacion de la clave deben ser iguales
    if(clave !== claveConfirmar){
        return false;
    }

    //La clave debe tener 8 caracteres minimo y debe tener letras y numeros
    if(clave.length >= 8 && tieneLetrasYNumeros){
        return true;        
    } else {
        return false;
    }
}

function mostrarMensajeError(msg){
    mensajeError.innerHTML = msg;
}