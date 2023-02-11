import { createFormHTML } from "../components/formHtmlCteate.js";
import { createHTML } from "../components/cvHtmlCreate.js";
import {
  getAllOutputs,
  setItem,
  getItem,
  updateOutput,
  showDiv,
} from "../components/localStorage.js";
import { validateInput } from "../components/validation.js";
const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");

const position = document.getElementById("Position");
const company = document.getElementById("Company");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const expDescription = document.getElementById("expDescription");

function validateAndStore(input) {
  input.addEventListener("keyup", function () {
    validateInput(input);
    setItem(input.id, input.value);
    updateOutput(input.id, input.value);
  });
}

validateAndStore(position);
validateAndStore(company);
validateAndStore(expDescription);

function storeLocal(input) {
  input.addEventListener("change", function () {
    setItem(input.id, input.value);
    updateOutput(input.id, input.value);
  });
}

storeLocal(startDate);
storeLocal(endDate);

function dateValidation(input) {
  const label = document.querySelector(`label[for="${input.id}"]`);
  if (input.value.length === 0) {
    label.classList.add("invalid-label");
    input.classList.remove("valid");
    input.classList.add("invalid");
  } else {
    label.classList.remove("invalid-label");
    input.classList.remove("invalid");
    input.classList.add("valid");
  }
}

function getLocalStorage() {
  position.value = getItem("Position");
  company.value = getItem("Company");
  expDescription.value = getItem("expDescription");
  startDate.value = getItem("startDate");
  endDate.value = getItem("endDate");
}

function onClickValidation() {
  dateValidation(startDate);
  dateValidation(endDate);
  validateInput(position);
  validateInput(company);
  validateInput(expDescription);
}

const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function () {
  createFormHTML();
});

backBtn.addEventListener("click", function () {
  window.location.href = "../personal-page/personal.html";
});

nextBtn.addEventListener("click", function () {
  onClickValidation();
});

function showDivOnKeyUp() {
  const inputs = [position, company, startDate, endDate, expDescription];
  inputs.forEach((input) => {
    const expContainer = document.getElementById("expContainer");
    input.addEventListener("keyup", function () {
      if (inputs.every((input) => input.value === "")) {
        if (!expContainer.classList.contains("hidden-div")) {
          expContainer.classList.add("hidden-div");
        }
      } else {
        expContainer.classList.remove("hidden-div");
      }
    });
  });
}

window.addEventListener("load", function () {
  createHTML();
  getAllOutputs();
  getLocalStorage();
  showDiv();
  showDivOnKeyUp();
});
