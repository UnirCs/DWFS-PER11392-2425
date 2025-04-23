
console.log('Script cargado correctamente!');

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Asignar manejadores de eventos a los campos del formulario
    document.getElementById('Input_nombre').addEventListener('change', validateFullName);
    document.getElementById('Input_username').addEventListener('change', validateUsername);
    document.getElementById('input_password').addEventListener('change', validatePassword);
    document.getElementById('input_password_2').addEventListener('change', validateConfirmPassword);
    document.getElementById('input_email').addEventListener('change', validateEmail);
    document.getElementById('boton_submit').addEventListener('click', (event) => {
        event.preventDefault();  
        window.location.replace('Cine/index.html');
        });
});


// Crear un mensaje de error y mostrarlo bajo el campo correspondiente
const createErrorMessage = (id, message) => {
    let existingMessage = document.getElementById(id + 'Error');
    if (!existingMessage) {
        let errorMessage = document.createElement('p');
        errorMessage.id = id + 'Error';
        errorMessage.textContent = message;
        errorMessage.classList.add('error');
        document.getElementById(id).insertAdjacentElement('afterend', errorMessage);
    }
};

// Eliminar el mensaje de error si ya no es necesario
const removeErrorMessage = (id) => {
    let existingMessage = document.getElementById(id + 'Error');
    if (existingMessage) {
        existingMessage.remove();
    }
};

// Validar el campo de nombre completo
const validateFullName = () => {
    let fullName = document.getElementById('Input_nombre').value;
    if (fullName.trim() === '') {
        createErrorMessage('Input_nombre', 'El nombre y apellidos son obligatorios.');
    } else {
        removeErrorMessage('Input_nombre');
    }
};

// Validar el campo de nombre de usuario
const validateUsername = () => {
    let username = document.getElementById('Input_username').value;
    if (username.trim() === '') {
        createErrorMessage('Input_username', 'El nombre de usuario es obligatorio.');
    } else {
        removeErrorMessage('Input_username');
    }
};

// Validar el campo de contraseña
const validatePassword = () => {
    let password = document.getElementById('input_password').value;
    let passwordRegex = /^[A-Za-z0-9]{8,}$/;
    if (!passwordRegex.test(password)) {
        createErrorMessage('input_password', 'La contraseña debe tener mínimo 8 caracteres y contener números y letras.');
    } else {
        removeErrorMessage('input_password');
    }
};

// Validar el campo de confirmación de contraseña
const validateConfirmPassword = () => {
    let password = document.getElementById('input_password_2').value;
    let confirmPassword = document.getElementById('input_password').value;
    if (password !== confirmPassword) {
        createErrorMessage('input_password_2', 'Las contraseñas no coinciden.');
    } else {
        removeErrorMessage('input_password_2');
    }
};

// Validar el campo de email
const validateEmail = () => {
    let email = document.getElementById('input_email').value;
    if (!email.includes('@') || !email.includes('.')) {
        createErrorMessage('input_email', 'Por favor, introduce un email válido.');
    } else {
        removeErrorMessage('input_email');
    }
};


