const contactForm = document.querySelector(".contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const phoneInput = document.getElementById("phone");

const isEmpty = (input) => {
  return input.value.trim().length == 0 ? true : false;
};

const isBetween = (input, min, max) => {
  return input.value.trim().length >= min && input.value.trim().length < max
    ? true
    : false;
};

const isEmailValid = (input) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(input.value.trim());
};

const isMessageValid = (input, min, max) => {
  return input.value.trim().length >= min && input.value.trim().length < max
    ? true
    : false;
};

const isPhoneValid = (input) => {
  const re = /^\d{7,15}$/;
  return re.test(input.value.trim());
};

const showError = (input, msg) => {
  const formField = input.parentElement;
  input.classList.remove("success");
  input.classList.add("error");
  const small = formField.querySelector("small");
  small.textContent = msg;
};

const showSuccess = (input) => {
  const formField = input.parentElement;
  input.classList.remove("error");
  input.classList.add("success");
  const small = formField.querySelector("small");
  small.textContent = "";
};

const checkName = (input) => {
  const min = 2;
  const max = 25;

  if (isEmpty(input)) {
    showError(input, "Este campo es obligatorio");
    return false;
  } else if (!isBetween(input, min, max)) {
    showError(input, `Este campo debe tener entre ${min} y ${max} caracteres`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
};

const checkEmail = (input) => {
  if (isEmpty(input)) {
    showError(input, "Este campo es obligatorio");
    return false;
  } else if (isEmailValid(input)) {
    showSuccess(input);
    return true;
  } else {
    showError(input, `Este email no es válido`);
    return false;
  }
};

const checkMessage = (input) => {
  const min = 10;
  const max = 233;

  if (isEmpty(input)) {
    showError(input, "Este campo es obligatorio");
    return false;
  } else if (isMessageValid(input, min, max)) {
    showSuccess(input);
    return true;
  } else {
    showError(input, `Este campo debe tener entre ${min} y ${max} caracteres`);
    return false;
  }
};

const checkPhone = (input) => {
  if (isEmpty(input)) {
    showError(input, "Este campo es obligatorio");
    return false;
  } else if (isPhoneValid(input)) {
    showSuccess(input);
    return true;
  } else {
    showError(input, `Este telefono no es válido`);
    return false;
  }
};

const validateForm = (e) => {
  e.preventDefault(); //???

  const isNameValid = checkName(nameInput);
  const isEmailValid = checkEmail(emailInput);
  const isMessageValid = checkMessage(messageInput);
  const isPhoneValid = checkPhone(phoneInput);

  const isValidForm =
    isNameValid && isEmailValid && isMessageValid && isPhoneValid;

  if (isValidForm) {
    console.log(messageInput.value);
  }
};

const initForm = () => {
  contactForm.addEventListener("submit", validateForm);
  nameInput.addEventListener("input", () => checkName(nameInput));
  emailInput.addEventListener("input", () => checkEmail(emailInput));
  phoneInput.addEventListener("input", () => checkPhone(phoneInput));
  messageInput.addEventListener("input", () => checkMessage(messageInput));
};

initForm();
