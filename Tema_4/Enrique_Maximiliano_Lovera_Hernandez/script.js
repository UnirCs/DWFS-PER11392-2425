// Función genérica para validar un campo
const validateField = (id, validator, errorMessage) => {
  const value = document.getElementById(id).value;
  if (!validator(value)) {
    createErrorMessage(id, errorMessage);
    return false;
  } else {
    removeErrorMessage(id);
    return true;
  }
};

// Crear un mensaje de error y mostrarlo bajo el campo correspondiente
const createErrorMessage = (id, message) => {
  let existingMessage = document.getElementById(id + "Error");
  if (!existingMessage) {
    let errorMessage = document.createElement("p");
    errorMessage.id = id + "Error";
    errorMessage.textContent = message;
    errorMessage.classList.add("error");
    document.getElementById(id).insertAdjacentElement("afterend", errorMessage);
  }
};

// Eliminar el mensaje de error si ya no es necesario
const removeErrorMessage = (id) => {
  let existingMessage = document.getElementById(id + "Error");
  if (existingMessage) {
    existingMessage.remove();
  }
};

// Validadores específicos
const validateNotEmpty = (value) => value.trim() !== "";

const validatePasswordStrength = (value) => /^[A-Za-z0-9]{8,}$/.test(value);

const validatePasswordMatch = () => {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  return password === confirmPassword;
};

const validateEmailFormat = (value) => {
  if (value.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value);
};
const formFields = [
  {
    id: "fullName",
    validator: validateNotEmpty,
    errorMessage: "El nombre y apellidos son obligatorios.",
  },
  {
    id: "username",
    validator: validateNotEmpty,
    errorMessage: "El nombre de usuario es obligatorio.",
  },
  {
    id: "password",
    validator: validatePasswordStrength,
    errorMessage:
      "La contraseña debe tener mínimo 8 caracteres y contener números y letras.",
  },
  {
    id: "confirmPassword",
    validator: validatePasswordMatch,
    errorMessage: "Las contraseñas no coinciden.",
  },
  {
    id: "email",
    validator: validateEmailFormat,
    errorMessage: "Por favor, introduce un email válido.",
  },
];

// Registrar los eventos de cambio para cada campo del formulario y validar
formFields.forEach(({ id, validator, errorMessage }) => {
  document
    .getElementById(id)
    .addEventListener("change", () =>
      validateField(id, validator, errorMessage)
    );
});
document.addEventListener("DOMContentLoaded", () => {
  // Manejar el evento de envío del formulario
  document.getElementById("userForm").addEventListener("submit", (event) => {
    event.preventDefault();

    // Ejecutar todas las validaciones antes de enviar el formulario
    let hasErrors = false;
    formFields.forEach(({ id, validator, errorMessage }) => {
      if (!validateField(id, validator, errorMessage)) {
        hasErrors = true;
      }
    });
    if (!hasErrors) {
      alert("Formulario enviado con éxito!");
    } else {
      alert("Por favor, corrija los errores antes de enviar el formulario.");
    }

    try {
      // utilizamos replace para evitar que el usuario vuelva a la página del formulario y
      // coloque datos que no queremos
      window.location.replace("./cinema/index.html");
    } catch (error) {
      console.error("Error al redirigir:", error);
    }
  });
});
