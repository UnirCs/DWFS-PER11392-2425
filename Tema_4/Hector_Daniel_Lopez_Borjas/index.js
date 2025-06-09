window.addEventListener("load", (event) => {
    document.getElementById('fullName').addEventListener('change', validateFullName);
    document.getElementById('password').addEventListener('change', validatePasswordAndConfirm);
    document.getElementById('confirmPassword').addEventListener('change', validateConfirmPassword);
    document.getElementById('email').addEventListener('change', validateEmail);
    document.getElementById('userForm').addEventListener('submit', (event) => {
        event.preventDefault();

        validateFullName();
        validatePassword();
        validateConfirmPassword();
        validateEmail();

        let errorMessages = document.querySelectorAll('.is-invalid');
        if (errorMessages.length === 0) {
            window.location.replace("./cinema.html");
        } else {
            alert('Por favor, corrija los errores antes de enviar el formulario.');
        }
    });
});

const useErrorMessage = (inputElement) => {
    inputElement.classList.add('is-invalid');
    inputElement.classList.remove('is-valid');
};

const useSuccessMessage = (inputElement) => {
    inputElement.classList.add('is-valid');
    inputElement.classList.remove('is-invalid');
};

const validateFullName = () => {
    let fullName = document.getElementById('fullName').value;
    let fullNameField = document.getElementById('fullName');
    if (fullName.trim() === '') {
        useErrorMessage(fullNameField);
    } else {
        useSuccessMessage(fullNameField);
    }
};

const validatePassword = () => {
    let password = document.getElementById('password').value;
    let passwordField = document.getElementById('password');
    let passwordRegex = /^[A-Za-z0-9]{8,}$/;
    if (!passwordRegex.test(password)) {
        useErrorMessage(passwordField);
        return false;
    } else {
        useSuccessMessage(passwordField);
        return true;
    }
};

const validateConfirmPassword = () => {
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let confirmPasswordField = document.getElementById('confirmPassword');
    if (document.getElementById('password').classList.contains('is-valid')) {
        if (password !== confirmPassword) {
            useErrorMessage(confirmPasswordField);
        } else {
            useSuccessMessage(confirmPasswordField);
        }
    } else {
        useErrorMessage(confirmPasswordField);
    }
};

const validatePasswordAndConfirm = () => {
    const isPasswordValid = validatePassword();
    if (isPasswordValid) {
        validateConfirmPassword();
    } else {
        useErrorMessage(document.getElementById('confirmPassword'));
    }
};

const validateEmail = () => {
    let email = document.getElementById('email').value;
    let emailField = document.getElementById('email');
    if (!email.includes('@') || !email.includes('.')) {
        useErrorMessage(emailField);
    } else {
        useSuccessMessage(emailField);
    }
};