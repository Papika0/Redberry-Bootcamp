import {
  setItem,
  updateOutput,
  getItem,
  showHiddenFields,
} from "./localstorage.js";

const name = document.getElementById("Name");
const lastName = document.getElementById("Lastname");
const photo = document.getElementById("photoInput");
const email = document.getElementById("Email");
const phoneNumber = document.getElementById("Phone");
const aboutMe = document.getElementById("AboutMe");

const georgianRegex = /^[ა-ჰ]+$/;
const emailRegex = /^\w+@redberry.ge$/;
const phoneRegex = /^(\+995)\d{9}$/;

const uploadButton = document.getElementById("upload-button");
const nextBtn = document.getElementById("next-btn");

export { name, lastName, email, phoneNumber, photo, aboutMe };

function createSuccessIcon(id) {
  const iconContainer = document.createElement("div");
  iconContainer.id = `icon-container-${id}`;
  iconContainer.classList.add("icon");
  iconContainer.innerHTML = `<img src="../../../assets/images/success-icon.svg" />`;
  return iconContainer;
}

function createErrorIcon(id) {
  const iconContainer = document.createElement("div");
  iconContainer.id = `icon-container-${id}`;
  iconContainer.classList.add("icon");
  iconContainer.innerHTML = `<img src="../../../assets/images/error-icon.svg" />`;
  return iconContainer;
}

function inputValidation(input, regex) {
  const label = document.querySelector(`label[for="${input.id}"]`);
  const inputId = input.id;
  const iconContainer = document.getElementById(`icon-container-${inputId}`);
  if (regex.test(input.value) && input.value.length >= 2) {
    if (iconContainer) {
      iconContainer.remove();
    }
    input.parentNode.insertBefore(
      createSuccessIcon(inputId),
      input.nextSibling
    );
    input.classList.add("valid");
    input.classList.remove("invalid");
    label.classList.remove("invalid-label");
  } else {
    input.classList.remove("valid");
    if (iconContainer) {
      iconContainer.remove();
    }
    input.parentNode.insertBefore(createErrorIcon(inputId), input.nextSibling);
    input.classList.add("invalid");
    label.classList.add("invalid-label");
  }
}

function validateInput(input, regex) {
  input.addEventListener("keyup", function (e) {
    setItem(input.id, e.target.value);
    if (regex) {
      inputValidation(input, regex);
    }
    updateOutput(input, e.target.value);
    showHiddenFields(input, e.target.value);
  });
}

validateInput(name, georgianRegex);
validateInput(lastName, georgianRegex);
validateInput(email, emailRegex);
validateInput(phoneNumber, phoneRegex);
validateInput(photo);
validateInput(aboutMe);

function uploadErrorIcon() {
  const svg = document.createElement("img");
  svg.id = "upload-error-icon";
  svg.src = "../../../assets/images/error-icon.svg";
  svg.style.marginLeft = "7px";
  uploadButton.after(svg);
}

function validatePhoto() {
  if (!photo.value && !document.getElementById("upload-error-icon")) {
    if (!getItem("Photo")) uploadErrorIcon();
  } else if (photo.value || getItem("Photo")) {
    document.getElementById("upload-error-icon").remove();
  }
}

function onSubmitValidation() {
  inputValidation(name, georgianRegex);
  inputValidation(lastName, georgianRegex);
  inputValidation(email, emailRegex);
  inputValidation(phoneNumber, phoneRegex);
  validatePhoto();
}

nextBtn.addEventListener("click", function () {
  onSubmitValidation();
  const invalidElements = document.querySelectorAll(".invalid");
  if (invalidElements.length === 0) {
    window.location.href = "./education.html";
  }
});
