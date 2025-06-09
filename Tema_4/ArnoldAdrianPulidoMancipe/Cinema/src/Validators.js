const NAME_ID = 'name';
const USER_ID = 'user';
const PASSWORD_ID = 'password';
const PASSVERIFY_ID = 'passVerify';
const EMAIL_ID = "email";
const SEATS_PAGE = "Seats.html";

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById(NAME_ID).addEventListener('change', validateFullName);
    document.getElementById(USER_ID).addEventListener('change', validateUser);
    document.getElementById(PASSWORD_ID).addEventListener('change', validatePassword);
    document.getElementById(PASSVERIFY_ID).addEventListener('change', validateVerifyPassword);
    document.getElementById(EMAIL_ID).addEventListener('change', validateEmail);
});

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

const removeErrorMessage = (id) => {
    let existingMessage = document.getElementById(id + 'Error');
    if (existingMessage) {
        existingMessage.remove();
    }
};

const validateFullName = () => {
    let fullName = document.getElementById(NAME_ID).value;
    if (fullName.trim() === '') {
        createErrorMessage(NAME_ID, 'Los nombres y apellidos son obligatorios.');
    } else {
        removeErrorMessage(NAME_ID);
    }
};

const validateUser = () => {
    let username = document.getElementById(USER_ID).value;
    if (username.trim() === '') {
        createErrorMessage(USER_ID, 'El nombre de usuario es obligatorio.');
    } else {
        removeErrorMessage(USER_ID);
    }
};

const validatePassword = () => {
    let password = document.getElementById(PASSWORD_ID).value;
    let passwordRegex = /^[A-Za-z0-9]{8,}$/;
    if (!passwordRegex.test(password)) {
        createErrorMessage(PASSWORD_ID, 'La contraseña debe tener mínimo 8 caracteres y contener números y letras.');
    } else {
        removeErrorMessage(PASSWORD_ID);
    }
};

const validateVerifyPassword = () => {
    let password = document.getElementById(PASSWORD_ID).value;
    let confirmPassword = document.getElementById(PASSVERIFY_ID).value;
    if (password !== confirmPassword) {
        createErrorMessage(PASSVERIFY_ID, 'Las contraseñas no coinciden.');
    } else {
        removeErrorMessage(PASSVERIFY_ID);
    }
};

const validateEmail = () => {
    let email = document.getElementById(EMAIL_ID).value;
    if (!email.includes('@') || !email.includes('.')) {
        createErrorMessage(EMAIL_ID, 'El email ingresado no es válido');
    } else {
        removeErrorMessage(EMAIL_ID);
    }
};

document.getElementById('register-form').addEventListener('submit', (event) => {
    event.preventDefault();

    validateFullName();
    validateUser();
    validatePassword();
    validateVerifyPassword();
    validateEmail();

    let errorMessages = document.querySelectorAll('.error');
    if (errorMessages.length === 0) {
        alert('Formulario enviado con éxito!');
        //cuando se envía un formulario es mejor no permitir que vuelva atás en la navegación
        window.location.replace(SEATS_PAGE)
    } else {
        alert('Por favor, corrija los errores antes de enviar el formulario.');
    }
});