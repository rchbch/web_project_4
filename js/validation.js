const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function showInputError(input, settings) {
  const { inputErrorClass, errorClass } = settings;
  const errorMessage = input.validationMessage;
  const errorElement = document.querySelector(
    `.popup__input-error_type_${input.name}`
  );
  input.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(input, settings) {
  const { inputErrorClass, errorClass } = settings;
  const errorElement = document.querySelector(
    `.popup__input-error_type_${input.name}`
  );
  input.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
}

function checkValidity(input, settings) {
  if (!input.validity.valid) {
    showInputError(input, settings);
  } else {
    hideInputError(input, settings);
  }
}

const hasInvalidInput = (inputs) => {
  return inputs.some((inputs) => {
    return !inputs.validity.valid;
  });
};

const toggleButtonState = (inputs, buttonElement, settings) => {
  const { inactiveButtonClass } = settings;
  if (hasInvalidInput(inputs)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

function enableValidation(settings) {
  const { formSelector, inputSelector, submitButtonSelector } = settings;
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => evt.preventDefault());
    const inputs = Array.from(form.querySelectorAll(inputSelector));
    const buttonElement = form.querySelector(submitButtonSelector);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkValidity(input, settings);
        toggleButtonState(inputs, buttonElement, settings);
      });
    });
  });
}

enableValidation(config);

function initialValidationCheck(form, settings) {
  const { inputSelector, submitButtonSelector } = settings;
  const inputs = Array.from(form.querySelectorAll(inputSelector));
  const buttonElement = form.querySelector(submitButtonSelector);
  inputs.forEach((input) => {
    hideInputError(input, settings);
    toggleButtonState(inputs, buttonElement, settings);
  });
}
