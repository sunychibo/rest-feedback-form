import IMask from 'imask';
import { xhrPOST, fetchPOST, axiosPOST } from './request';

const phoneInput = document.querySelector('[id=phonenumber]');
const phoneMaskConfig = { mask: '+{7} ( 000 ) 000-00-00', lazy: true };
const phoneMask = new IMask(phoneInput, phoneMaskConfig);
const fieldsToValidate = document.querySelectorAll('.feedback-form__field');
const feedbackForm = document.getElementById('feedback-form');

const errorMessages = [
  {
    name: 'firstname',
    messages: {
      invalid: 'Введите коректное имя',
      empty: 'Введите имя'
    }
  },
  {
    name: 'lastname',
    messages: {
      invalid: 'Введите корректную фамилию',
      empty: 'Введите фамилию'
    }
  },
  {
    name: 'email',
    messages: {
      invalid: 'Введите корректный email',
      empty: 'Введите email'
    }
  },
  {
    name: 'phonenumber',
    messages: {
      invalid: 'Введите корректный номер телефона',
      empty: 'Введите номер телефона'
    }
  },
  {
    name: 'message',
    messages: {
      invalid: 'Введите корректное сообщение',
      empty: 'Введите сообщение'
    }
  }
]

const regExpressions = {
  firstname: /[а-я'-]/gi,
  lastname: /[а-я'-]/gi,
  email: /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})+/g,
  phonenumber: /^[0-9]{11}/g,
  message: /[а-я0-9\r\n|\r|\n\.\)\(\-\—\"\'\;\? _,!:@]/gi
}

const validateHandler = (field) => {
  regExpressions[field.id].lastIndex = 0;
  let fieldValue = field.value;
  if (field.id === 'phonenumber') {
    let clearNumber = fieldValue.replace(/[^0-9]/g, '');
    fieldValue = clearNumber.length > 1 ? clearNumber : '';
  }
  let fieldValidity = regExpressions[field.id].test(fieldValue);
  let isRequired = !!field.dataset.required;
  let fieldErrorMessages = errorMessages.find(object => object.name === field.id).messages;

  const deleteErrorMessage = (field) => {
    const errorMessageElement = document.getElementById(`${field.id}-error`);
    if (errorMessageElement) {
      errorMessageElement.parentNode.removeChild(errorMessageElement);
    }
  }

  const addErrorMessage = (field, errorType) => {
    let errorMessageElement = document.getElementById(`${field.id}-error`);
    if (errorMessageElement) {
      errorMessageElement.textContent = fieldErrorMessages[errorType];
    } else {
      errorMessageElement = document.createElement("span");
      errorMessageElement.classList.add('feedback-form__error-message');
      errorMessageElement.id = `${field.id}-error`;
      errorMessageElement.textContent = fieldErrorMessages[errorType];
      field.parentNode.appendChild(errorMessageElement);
    }
  }

  const errorClass = 'feedback-form__field--invalid';

  const addErrorClass = (field) => {
    if (field.classList.contains(errorClass)) {
      return
    } else {
      field.classList.add(errorClass);
    }
  }

  const deleteErrorClass = (field) => {
    if (field.classList.contains(errorClass)) {
      field.classList.remove(errorClass);
    } else {
      return
    }
  }

  if (fieldValue) {
    if (fieldValidity) {
      deleteErrorClass(field);
      deleteErrorMessage(field);
      return true;
    } else {
      addErrorClass(field);
      addErrorMessage(field, 'invalid');
      return false;
    }
  } else {
    if (isRequired) {
      addErrorClass(field);
      addErrorMessage(field, 'empty');
      return false;
    } else {
      deleteErrorClass(field);
      deleteErrorMessage(field);
      return true;
    }
  }
}

for (let field of fieldsToValidate) {
  field.addEventListener('blur', (event) => {
    validateHandler(event.target);
  });
}

feedbackForm.addEventListener('submit', (event) => {
  // event.returnValue = false - for IE implementation
  event.preventDefault ? event.preventDefault() : (event.returnValue = false);
  let sendingData = {}
  sendingData.date = new Date().toISOString();
  let isFormValid = true;
  for (let field of fieldsToValidate) {
    if (validateHandler(field)) {
      let fieldValue = field.value;
      if (field.id === 'phonenumber') {
        fieldValue = fieldValue.replace(/ /g, '');
      }
      sendingData[field.id] = fieldValue;
    } else {
      isFormValid = false;
    }
  }
  if (isFormValid) {
    // xhrPOST(sendingData);
    // fetchPOST(sendingData);
    axiosPOST(sendingData);
    // Отправка
  } else {
    // Невалидна
    return
  }
});