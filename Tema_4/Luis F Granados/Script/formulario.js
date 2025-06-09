document.addEventListener('DOMContentLoaded', function () {
    /* Inicializar el modal */
    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function () {
            const message = this.getAttribute('data-message'); // Obtener mensaje del atributo
            const modalMessage = document.getElementById('modalMessage');
            if (modalMessage) {
                modalMessage.textContent = message;
            }
        });
    });
    /* Eventos */
    document.getElementById('firstName').addEventListener('change', validateFirstName);
    document.getElementById('lastName').addEventListener('change', validateLastName);
    document.getElementById('username').addEventListener('change', validateUsername);
    document.getElementById('password').addEventListener('change', validatePassword);
    document.getElementById('confirmPassword').addEventListener('change', validateConfirmPassword);
    document.getElementById('email').addEventListener('change', validateEmail);
});

// Validar el campo de nombre
const validateFirstName = () => {
    let firstName = document.getElementById('firstName').value;
    if (firstName.trim() === '') {
        createErrorMessage('firstName', 'El nombre es obligatorios.');
    } else {
        removeErrorMessage('firstName');
    }
};

// Validar el campo de apellido
const validateLastName = () => {
    let lastName = document.getElementById('lastName').value;
    if (lastName.trim() === '') {
        createErrorMessage('lastName', 'El apellido es obligatorios.');
    } else {
        removeErrorMessage('lastName');
    }
};

// Validar el campo de nombre de usuario
const validateUsername = () => {
    let username = document.getElementById('username').value;
    if (username.trim() === '') {
        createErrorMessage('username', 'El nombre de usuario es obligatorio.');
    } else {
        removeErrorMessage('username');
    }
};

// Validar el campo de contraseña
const validatePassword = () => {
    let password = document.getElementById('password').value;
    let passwordRegex = /^[A-Za-z0-9]{8,}$/;
    if (!passwordRegex.test(password)) {
        createErrorMessage('password', 'La contraseña debe tener mínimo 8 caracteres y contener números y letras.');
    } else {
        removeErrorMessage('password');
    }
};

// Validar el campo de confirmación de contraseña
const validateConfirmPassword = () => {
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
        createErrorMessage('confirmPassword', 'Las contraseñas no coinciden.');
    } else {
        removeErrorMessage('confirmPassword');
    }
};

// Validar el campo de email
const validateEmail = () => {
    let email = document.getElementById('email').value;
    if (!email.includes('@') || !email.includes('.')) {
        createErrorMessage('email', 'Por favor, introduce un email válido.');
    } else {
        removeErrorMessage('email');
    }
};

// Crear un mensaje de error y mostrarlo bajo el campo correspondiente
const createErrorMessage = (id, message) => {
    let existingMessage = document.getElementById(id + 'Error');
    if (!existingMessage) {
        let errorMessage = document.createElement('p');
        errorMessage.id = id + 'Error';
        errorMessage.textContent = message;
        errorMessage.classList.add('error');

        // Inserta el mensaje de error dentro del contenedor del campo
        const inputField = document.getElementById(id).parentElement;
        inputField.appendChild(errorMessage);
    }
};

// Eliminar el mensaje de error si ya no es necesario
const removeErrorMessage = (id) => {
    let existingMessage = document.getElementById(id + 'Error');
    if (existingMessage) {
        existingMessage.remove();
    }
};

// Manejar el evento de envío del formulario
document.getElementById('userForm').addEventListener('submit', (event) => {
    event.preventDefault();

    // Ejecutar todas las validaciones antes de enviar el formulario
    validateFirstName();
    validateLastName();
    validateUsername();
    validatePassword();
    validateConfirmPassword();
    validateEmail();

    // Comprobar si hay mensajes de error
    let errorMessages = document.querySelectorAll('form p');
    if (errorMessages.length === 0) {
        // No hay errores, se puede procesar el formulario
        //document.getElementById('userForm').innerHTML = '<iframe src="../Html/cinema.html" width="100%" height="600px" frameBorder="0"></iframe>';
        window.location.href = '../Html/cinema.html';
    } else {
        // Hay errores, se informa al usuario
        alert('Por favor, corrija los errores antes de enviar el formulario.');
    }
});

document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const icon = this.querySelector('i');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        icon.textContent = 'visibility_off';
    } else {
        passwordField.type = 'password';
        icon.textContent = 'visibility';
    }
});

document.getElementById('togglePassword1').addEventListener('click', function () {
    const confirmPasswordField = document.getElementById('confirmPassword');
    const icon = this.querySelector('i');
    if (confirmPasswordField.type === 'password') {
        confirmPasswordField.type = 'text';
        icon.textContent = 'visibility_off';
    } else {
        confirmPasswordField.type = 'password';
        icon.textContent = 'visibility';
    }
});