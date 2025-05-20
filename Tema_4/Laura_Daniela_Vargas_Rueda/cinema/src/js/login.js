// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Asignar manejadores de eventos a los campos del formulario
  document.getElementById("name").addEventListener("change", validateName);
  document.getElementById("user_name").addEventListener("change", validateUsername);
  document.getElementById("password").addEventListener("change", validatePassword);
  document.getElementById("confirm_password").addEventListener("change", validateConfirmPassword);
  document.getElementById("email").addEventListener("change", validateEmail);
  document.getElementById("form").addEventListener("submit", validateForm);
});

// Crear un mensaje de error y mostrarlo bajo el campo correspondiente
const showErrorMessage = (id, message) => {
  let existingMessage = document.getElementById(id + "Error");
  if (!existingMessage) {
    let errorMessage = document.createElement("p");
    errorMessage.id = id + "Error";
    errorMessage.textContent = message;
    errorMessage.classList.add("error-text");
    document.getElementById(id).insertAdjacentElement("afterend", errorMessage);
  }
};

// Eliminar el mensaje de error si ya no es necesario
const hideErrorMessage = (id) => {
  let existingMessage = document.getElementById(id + "Error");
  if (existingMessage) {
    existingMessage.remove();
  }
};

const validateName = () => {
  let name = document.getElementById("name").value;
  if (name.trim() === "" || name.split(" ").length < 2) {
    showErrorMessage("name", "El nombre y apellidos son obligatorios.");
  } else {
    hideErrorMessage("name");
  }
};

const validateUsername = () => {
  let userName = document.getElementById("user_name").value;
  if (userName.trim() === "" || userName.length < 3) {
    showErrorMessage("user_name", "El usuario debe tener al menos 3 caracteres.");
  } else {
    hideErrorMessage("user_name");
  }
};

const validatePassword = () => {
  let password = document.getElementById("password").value;
  let passwordRegex = /^[A-Za-z0-9]{8,}$/;
  if (!passwordRegex.test(password)) {
    showErrorMessage("password", "La contraseña debe tener mínimo 8 caracteres y contener números y letras.");
  } else {
    hideErrorMessage("password");
  }
};

const validateConfirmPassword = () => {
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirm_password").value;
  if (password !== confirmPassword) {
    showErrorMessage("confirm_password", "Las contraseñas no coinciden.");
  } else {
    hideErrorMessage("confirm_password");
  }
};

const validateEmail = () => {
  let email = document.getElementById("email").value;
  if (email.trim() === "" || email.includes("@") === false) {
    showErrorMessage("email", "El usuario debe tener al menos 3 caracteres.");
  } else {
    hideErrorMessage("email");
  }
};

const validateForm = (event) => {
  event.preventDefault();

  // Ejecutar todas las validaciones antes de enviar el formulario
  validateName();
  validateUsername();
  validatePassword();
  validateConfirmPassword();
  validateEmail();

  // Comprobar si hay mensajes de error
  let errorList = document.getElementsByClassName("error-text");
  if (errorList.length === 0) {
    // Uso replace para evitar que el usuario pueda volver a la página de registro al presionar el botón de retroceso
    window.location.replace("index.html");
  } else {
    alert("Por favor, corrija los errores antes de registrarse.");
  }
};
