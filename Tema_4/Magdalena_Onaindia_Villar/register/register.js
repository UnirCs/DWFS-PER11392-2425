document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();

    const form = document.getElementById('registerForm');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    const validatePasswords = () => {
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity('Las contraseñas no coinciden');
            return false;
        } else {
            confirmPassword.setCustomValidity('');
            return true;
        }
    };

    //validar al inputar para poner en rojo
    confirmPassword.addEventListener('input', validatePasswords);

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        //validar
        if (!validatePasswords() || !form.checkValidity()) {
            M.toast({ html: 'Por favor, corrige los errores.', classes: 'red' });
            return;
        }

        //como simulacion
        M.toast({ html: '¡Registro exitoso!', classes: 'green' });
        //pongo replace para que no pueda volver a la pagina de registro
        setTimeout(() => window.location.replace("../cinema/index.html"), 2000);
    });
});