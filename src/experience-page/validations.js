import { createFormHTML } from "../components/formHtmlCteate.js";
import {
  createHTML,
  createExp,
  createEdu,
} from "../components/cvHtmlCreate.js";
import {
  getAllOutputs,
  setItem,
  getItem,
  updateOutput,
  showDiv,
  localEmptyClear,
} from "../components/localStorage.js";
import { validateInput } from "../components/validation.js";
import { getAdditionalInputs } from "../components/getAdditional.js";
const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");

const position = document.getElementById("Position");
const company = document.getElementById("Company");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const expDescription = document.getElementById("expDescription");

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

function validateAndStore(input) {
  input.addEventListener("keyup", function () {
    validateInput(input);
    setItem(input.id, input.value);
    updateOutput(input.id, input.value);
    if (input.value === "") {
      localStorage.removeItem(input.id);
    }
  });
}

validateAndStore(position);
validateAndStore(company);
validateAndStore(expDescription);

function storeLocal(input) {
  const label = document.querySelector(`label[for="${input.id}"]`);
  input.addEventListener("change", function () {
    setItem(input.id, input.value);
    updateOutput(input.id, input.value);
    if (input.value === "") {
      localStorage.removeItem(input.id);
      input.classList.remove("valid");
      input.classList.add("invalid");
      label.classList.add("invalid-label");
    } else {
      input.classList.remove("invalid");
      input.classList.add("valid");
      label.classList.remove("invalid-label");
    }
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
let counter = 1;
addBtn.addEventListener("click", function () {
  if (!document.getElementById(`form${counter}`)) addExp(counter);
  else {
    counter++;
    addExp(counter);
  }
});

backBtn.addEventListener("click", function () {
  window.location.href = "../personal-page/personal.html";
});

function checkAdditionalExp(inputs) {
  inputs.forEach((input) => {
    input.addEventListener("keyup", function () {
      if (input.value === "") {
        validateAdditional(false, inputs);
      } else {
        validateAdditional(true, inputs);
      }
    });
  });
}

function validateAdditional(value, inputs) {
  nextBtn.addEventListener("click", function () {
    if (value === true) {
      validateInput(inputs[0]);
      validateInput(inputs[1]);
      validateInput(inputs[2]);
      dateValidation(inputs[3]);
      dateValidation(inputs[4]);
    } else {
      inputs.forEach((input) => {
        const label = document.querySelector(`label[for="${input.id}"]`);
        const iconContainer = document.getElementById(
          `icon-container-${input.id}`
        );
        input.classList.remove("invalid");
        label.classList.remove("invalid-label");
        if (iconContainer) {
          iconContainer.remove();
        }
      });
    }
  });
}

function addExp(num) {
  if (!document.getElementById(`form${num}`)) {
    createFormHTML(num);
    createExp(num);
    const position = document.getElementById(`Position${num}`);
    const company = document.getElementById(`Company${num}`);
    const startDate = document.getElementById(`startDate${num}`);
    const endDate = document.getElementById(`endDate${num}`);
    const expDescription = document.getElementById(`expDescription${num}`);
    const inputs = [position, company, expDescription, startDate, endDate];
    validateAndStore(position);
    validateAndStore(company);
    validateAndStore(expDescription);
    storeLocal(startDate);
    storeLocal(endDate);
    checkAdditionalExp(inputs);
  }
}

function getAdditionalInput() {
  let keysToValidate = [];
  let prefixes = [
    "Position",
    "Company",
    "expDescription",
    "startDate",
    "endDate",
  ];
  let prefixMap = {};
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    prefixes.forEach((prefix) => {
      if (key.startsWith(prefix) && key.substring(prefix.length) !== "") {
        let value = localStorage.getItem(key);
        let keyIndex = key.substring(prefix.length);
        if (!prefixMap[keyIndex]) prefixMap[keyIndex] = [];
        prefixMap[keyIndex].push(prefix + keyIndex);
        addExp(keyIndex);
        document.getElementById(key).value = value;
        updateOutput(key, value);
      }
    });
  }
  for (let keyIndex in prefixMap) {
    keysToValidate = prefixes.map((prefix) => prefix + keyIndex);
    keysToValidate.forEach((key) => {
      if (key.startsWith("startDate") || key.startsWith("endDate")) {
        dateValidation(document.getElementById(key));
      } else validateInput(document.getElementById(key));
    });
  }
}

nextBtn.addEventListener("click", function (e) {
  getAdditionalInputs();
  onClickValidation();
  const invalidElements = document.querySelectorAll(".invalid");
  console.log(invalidElements);
  if (invalidElements.length === 0) {
    window.location.href = "../education-page/education.html";
  } else {
    e.preventDefault();
  }
});

window.addEventListener("load", function () {
  createHTML();
  createExp();
  getAdditionalInput();
  createEdu();
  getAdditionalInputs("edu");
  getAllOutputs();
  getLocalStorage();
  showDiv();
  showDivOnKeyUp();
  localEmptyClear();
});
