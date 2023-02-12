import { createFormEdu } from "../components/formHtmlCteate.js";
import {
  createHTML,
  createExp,
  createEdu,
} from "../components/cvHtmlCreate.js";
import {
  setItem,
  getItem,
  getAllOutputs,
  showDiv,
  updateOutput,
  localEmptyClear,
} from "../components/localStorage.js";
import { validateInput } from "../components/validation.js";
import { fetchDegrees } from "../components/fetchDegrees.js";
import { getAdditionalInputs } from "../components/getAdditional.js";

const institute = document.getElementById("Institute");
const degree = document.getElementById("Degree");
const eduDescription = document.getElementById("eduDescription");
const dueDate = document.getElementById("dueDate");

const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");
const addBtn = document.getElementById("addBtn");
const inputs = [institute, eduDescription, dueDate, degree];

function showDivOnKeyUp() {
  inputs.forEach((input) => {
    let method = "keyup";
    if (input === dueDate || input === degree) {
      method = "change";
    }
    const eduContainer = document.getElementById("eduContainer");
    input.addEventListener(method, function () {
      if (inputs.every((input) => input.value === "")) {
        if (!eduContainer.classList.contains("hidden-div")) {
          eduContainer.classList.add("hidden-div");
        }
      } else {
        eduContainer.classList.remove("hidden-div");
      }
    });
  });
}

function listenAndStore(input) {
  let method = "keyup";
  const inputId = input.id;
  if (inputId.includes("dueDate") || inputId.includes("Degree")) {
    method = "change";
  }
  input.addEventListener(method, function () {
    let value = input.value;
    if (inputId.includes("Degree")) {
      value = input.options[input.selectedIndex].text;
    }
    if (inputId.includes("Institute") || inputId.includes("eduDescription")) {
      validateInput(input, value);
    }
    if (inputId.includes("dueDate") || inputId.includes("Degree")) {
      validateSelectDate(input);
    }
    setItem(inputId, value);
    updateOutput(inputId, value);
    if (value === "") {
      localStorage.removeItem(inputId);
    }
  });
}

function validateSelectDate(input) {
  const label = document.querySelector(`label[for="${input.id}"]`);
  if (input.value === "") {
    input.classList.remove("valid");
    input.classList.add("invalid");
    label.classList.add("invalid-label");
  } else {
    input.classList.remove("invalid");
    input.classList.add("valid");
    label.classList.remove("invalid-label");
  }
}

listenAndStore(institute);
listenAndStore(eduDescription);
listenAndStore(dueDate);
listenAndStore(degree);

function validateOnClick(inputs) {
  inputs.forEach((input) => {
    let value = input.value;
    if (input === degree) {
      value = input.options[input.selectedIndex].text;
    }
    if (input === institute || input === eduDescription) {
      validateInput(input, value);
    }
    if (input === dueDate || input === degree) {
      validateSelectDate(input);
    }
  });
}

function getLocalStorage() {
  const inputs = [institute, eduDescription, dueDate];
  inputs.forEach((input) => {
    const value = getItem(input.id);
    if (value) {
      input.value = value;
    }
  });

  const degreeValue = getItem("Degree");
  if (degreeValue) {
    const degreeDropdown = document.querySelector("#Degree");
    for (let i = 0; i < degreeDropdown.options.length; i++) {
      if (degreeDropdown.options[i].value === degreeValue) {
        degreeDropdown.selectedIndex = i;
        break;
      }
    }
  }
}

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
      validateOnClick(inputs);
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

function addEdu(num) {
  if (!document.getElementById(`form${num}`)) {
    createFormEdu(num);
    createEdu(num);
    const institute = document.getElementById(`Institute${num}`);
    const degree = document.getElementById(`Degree${num}`);
    const eduDescription = document.getElementById(`eduDescription${num}`);
    const dueDate = document.getElementById(`dueDate${num}`);
    const newInputs = [institute, eduDescription, dueDate, degree];
    newInputs.forEach((input) => {
      listenAndStore(input);
    });
    checkAdditionalExp(inputs);
  }
}

let counter = 1;
addBtn.addEventListener("click", function () {
  if (!document.getElementById(`form${counter}`)) {
    addEdu(counter);
    fetchDegrees(counter);
  } else {
    counter++;
    addEdu(counter);
    fetchDegrees(counter);
  }
});

backBtn.addEventListener("click", function () {
  window.location.href = "../experience-page/experience.html";
});

function getAdditionalInputsEdu() {
  let keysToValidate = [];
  let prefixes = ["Institute", "Degree", "eduDescription", "dueDate"];
  let prefixMap = {};
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    prefixes.forEach((prefix) => {
      if (key.startsWith(prefix) && key.substring(prefix.length) !== "") {
        let value = localStorage.getItem(key);
        let keyIndex = key.substring(prefix.length);
        if (!prefixMap[keyIndex]) prefixMap[keyIndex] = [];
        prefixMap[keyIndex].push(prefix + keyIndex);
        addEdu(keyIndex);
        fetchDegrees(keyIndex);
        document.getElementById(key).value = value;
        updateOutput(key, value);
        if (key.includes("Degree")) {
          const degreeDropdown = document.getElementById(key);
          console.log(degreeDropdown);
          for (let i = 0; i < degreeDropdown.options.length; i++) {
            if (degreeDropdown.options[i].value === value) {
              degreeDropdown.selectedIndex = i;
              break;
            }
          }
        }
      }
    });
  }
  for (let keyIndex in prefixMap) {
    keysToValidate = prefixes.map((prefix) => prefix + keyIndex);
    keysToValidate.forEach((key) => {
      listenAndStore(document.getElementById(key));
    });
  }
}

nextBtn.addEventListener("click", function () {
  validateOnClick(inputs);
  getAdditionalInputsEdu();
  const invalidElements = document.querySelectorAll(".invalid");
  console.log(invalidElements);
});

await fetchDegrees();
createHTML();
createExp();
getAdditionalInputs();
createEdu();
getAllOutputs();
showDiv();
localEmptyClear();
showDivOnKeyUp();
getLocalStorage();
getAdditionalInputsEdu();
