document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const emailInput = document.getElementById("email");
  const fullNameInput = document.getElementById("fullName");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

 
  const validateEmail = () => {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      emailInput.classList.add("is-invalid");
      emailInput.style.borderColor = "red";
      emailInput.style.color = "red";
      return false;
    } else {
      emailInput.classList.remove("is-invalid");
      emailInput.classList.add("is-valid");
      emailInput.style.borderColor = "green";
      emailInput.style.color = "green";
      return true;
    }
  };


  const validateTextInput = (input) => {
    console.log(input);
    if (input.value.trim() === "") {
      input.classList.add("is-invalid");
      input.style.borderColor = "red";
      input.style.color = "red";
      return false;
    } else {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      input.style.borderColor = "green";
      input.style.color = "green";
      return true;
    }
  };


  const validatePasswords = () => {
    if (passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordInput.classList.add("is-invalid");
      confirmPasswordInput.style.borderColor = "red";
      confirmPasswordInput.style.color = "red";
      return false;
    } else {
      confirmPasswordInput.classList.remove("is-invalid");
      confirmPasswordInput.classList.add("is-valid");
      confirmPasswordInput.style.borderColor = "green";
      confirmPasswordInput.style.color = "green";
      return true;
    }
  };


  form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const validInput1=validateTextInput(fullNameInput);
    const validInput2 =validateTextInput(usernameInput);
    const validEmail = validateEmail();
    const validPassword = validatePasswords();;
   

    if (
      !validInput1 ||
      !validInput2 ||
      !validEmail ||
      !validPassword
    ) {
      alert("Por favor, corrige los errores en el formulario.");
      return;
    }

    alert("Formulario enviado correctamente.");
    form.reset();
    window.location.href = "cinema.html"; // Redirigir a la página de inicio
  });

 
  fullNameInput.addEventListener("blur", () => validateTextInput(fullNameInput));
  usernameInput.addEventListener("blur", () => validateTextInput(usernameInput));
  emailInput.addEventListener("blur", () => validateEmail());
  passwordInput.addEventListener("blur", () => validateTextInput(passwordInput));
  confirmPasswordInput.addEventListener("blur", () => validatePasswords());


  [fullNameInput, usernameInput, emailInput, passwordInput, confirmPasswordInput].forEach((input) => {
    input.addEventListener("input", () => {
      input.classList.remove("is-invalid");
      input.style.borderColor = "";
      input.style.color = "";
    });
  });
});