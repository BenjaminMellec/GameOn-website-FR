function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelector(".close");
const formData = document.querySelectorAll(".formData");
const form = document.getElementById("reserve");
const submitButton = document.querySelector(".btn-submit");
const modalSuccess = document.getElementById("success");
const closeSuccessElements = document.querySelectorAll(".close-success");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
modalClose.addEventListener("click", closeModal);
// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// function to validate "first" and "last" inputs, which are text inputs
function inputTextValidation(input) {
  if (input.value.length > 2) {
    input.parentElement.setAttribute("data-error-visible", false);
    return true;
  } else {
    input.parentElement.setAttribute("data-error-visible", true);
    return false;
  }
}

// function to validate inputs type email
function inputEmailValidation(input) {
  // regular expression given by w3c to test input mail value (https://www.w3.org/TR/2012/WD-html-markup-20120329/input.email.html)
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (input.value !== "" && regexEmail.test(input.value)) {
    input.parentElement.setAttribute("data-error-visible", false);
    return true;
  } else {
    input.parentElement.setAttribute("data-error-visible", true);
    return false;
  }
}

// function to validate inputs type date
function inputDateValidation(input) {
  const regexDate = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

  // valueify today's date & input's date to compare them
  const today = new Date().getTime();
  const inputValueified = new Date(input.value).getTime();

  if (
    input.value !== "" &&
    regexDate.test(input.value) &&
    inputValueified < today
  ) {
    input.parentElement.setAttribute("data-error-visible", false);
    return true;
  } else {
    input.parentElement.setAttribute("data-error-visible", true);
    return false;
  }
}

// function to validate inputs type number
function inputNumberValidation(input) {
  if (
    isNaN(input.value) ||
    input.value < 0 ||
    input.value > 99 ||
    !input.value
  ) {
    input.parentElement.setAttribute("data-error-visible", true);
    return false;
  } else {
    input.parentElement.setAttribute("data-error-visible", false);
    return true;
  }
}

// function to validate inputs type radio
function inputRadioValidation(inputs) {
  let radioChecked = false;
  for (radio of inputs) {
    radio.parentElement.setAttribute("data-error-visible", true);
    if (radio.checked) {
      radio.parentElement.setAttribute("data-error-visible", false);
      radioChecked = true;
      break;
    }
  }
  return radioChecked;
}

// function to validate inputs type checkbox
function inputCheckboxValidation(input) {
  if (input.checked) {
    input.parentElement.setAttribute("data-error-visible", false);
    return true;
  } else {
    input.parentElement.setAttribute("data-error-visible", true);
    return false;
  }
}

// cancel the reload of the page when submitting the form and submit the form when the thank you message closes
function thanks(event) {
  event.preventDefault();
  form.style.display = "none";
  modalSuccess.style.display = "block";
  modalClose.classList.remove("close");
  modalClose.classList.add("close-success");

  for (closeSuccess of closeSuccessElements) {
    this.addEventListener("click", function (e) {
      form.submit();
    });
  }
}

// final function using all others to validate the form fields
function validate() {
  const first = document.getElementById("first");
  const last = document.getElementById("last");
  const email = document.getElementById("email");
  const birthdate = document.getElementById("birthdate");
  const quantity = document.getElementById("quantity");
  const locations = document.querySelectorAll('[name="location"]');
  const conditions = document.getElementById("checkbox1");

  inputTextValidation(first);
  inputTextValidation(last);
  inputEmailValidation(email);
  inputDateValidation(birthdate);
  inputNumberValidation(quantity);
  inputRadioValidation(locations);
  inputCheckboxValidation(conditions);

  if (
    inputTextValidation(first) &&
    inputTextValidation(last) &&
    inputEmailValidation(email) &&
    inputDateValidation(birthdate) &&
    inputNumberValidation(quantity) &&
    inputRadioValidation(locations) &&
    inputCheckboxValidation(conditions)
  ) {
    thanks(this.event);
    return true;
  } else {
    return false;
  }
}
