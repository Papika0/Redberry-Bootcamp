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
  showDivOnKeyUp,
} from "../components/localStorage.js";
import { validateInput, validateSelectDate } from "../components/validation.js";
import { getAdditionalInputs } from "../components/getAdditional.js";
const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");

const position = document.getElementById("Position");
const company = document.getElementById("Company");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const expDescription = document.getElementById("expDescription");
const inputs = [position, company, startDate, endDate, expDescription];

function validateAndStore(input) {
  let method = "keyup";
  const inputId = input.id;
  if (inputId.includes("startDate") || inputId.includes("endDate")) {
    method = "change";
  }
  input.addEventListener(method, function () {
    if (inputId.includes("startDate") || inputId.includes("endDate")) {
      validateSelectDate(input);
      setItem(input.id, input.value);
      updateOutput(input.id, input.value);
    } else {
      validateInput(input);
      setItem(input.id, input.value);
      updateOutput(input.id, input.value);
    }
    if (input.value === "") {
      localStorage.removeItem(input.id);
    }
  });
}

validateAndStore(position);
validateAndStore(company);
validateAndStore(expDescription);
validateAndStore(startDate);
validateAndStore(endDate);

function getLocalStorage() {
  inputs.forEach((input) => {
    const value = getItem(input.id);
    if (value) {
      input.value = value;
    }
  });
}

function onClickValidation(inputs) {
  inputs.forEach((input) => {
    let inputId = input.id;
    if (inputId.includes("startDate") || inputId.includes("endDate")) {
      validateSelectDate(input);
    } else {
      validateInput(input);
    }
  });
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
    let method = "keyup";
    if (input.id.includes("startDate") || input.id.includes("endDate")) {
      method = "change";
    }
    input.addEventListener(method, function () {
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
      onClickValidation(inputs);
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
    const newInputs = [position, company, expDescription, startDate, endDate];
    newInputs.forEach((input) => {
      validateAndStore(input);
    });
    checkAdditionalExp(inputs);
  }
}
let keysToValidate = [];
let prefixes = [
  "Position",
  "Company",
  "expDescription",
  "startDate",
  "endDate",
];
let prefixMap = {};
function getAdditionalInput() {
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
}

function onClickValAdd() {
  for (let keyIndex in prefixMap) {
    keysToValidate = prefixes.map((prefix) =>
      document.getElementById(prefix + keyIndex)
    );

    if (keysToValidate.some((key) => key.value !== "")) {
      onClickValidation(keysToValidate);
    } else {
      keysToValidate.forEach((input) => {
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
  }
}

nextBtn.addEventListener("click", function (e) {
  onClickValidation(inputs);
  getAdditionalInput();
  onClickValAdd();
  const invalidElements = document.querySelectorAll(".invalid");
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
  getAllOutputs();
  getLocalStorage();
  showDiv();
  showDivOnKeyUp(inputs, "expContainer");
  localEmptyClear();
  createEdu();
  getAdditionalInputs("edu");
});
