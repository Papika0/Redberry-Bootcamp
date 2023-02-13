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
  showDivOnKeyUp,
} from "../components/localStorage.js";
import { validateInput, validateSelectDate } from "../components/validation.js";
import { fetchDegrees } from "../components/fetchDegrees.js";
import { getAdditionalInputs } from "../components/getAdditional.js";
import { postData } from "../components/postApi.js";

const institute = document.getElementById("Institute");
const degree = document.getElementById("Degree");
const eduDescription = document.getElementById("eduDescription");
const dueDate = document.getElementById("dueDate");

const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");
const addBtn = document.getElementById("addBtn");
const inputs = [institute, eduDescription, dueDate, degree];

function listenAndStore(input) {
  let method = "keyup";
  const inputId = input.id;
  if (inputId.includes("dueDate") || inputId.includes("Degree")) {
    method = "change";
  }
  input.addEventListener(method, function () {
    let value = input.value;
    if (inputId.includes("Degree")) {
      value = input.options[input.selectedIndex].innerText;
    }
    if (inputId.includes("Institute") || inputId.includes("eduDescription")) {
      validateInput(input, value);
    }
    if (inputId.includes("dueDate") || inputId.includes("Degree")) {
      validateSelectDate(input);
    }
    if (inputId.includes("Degree")) {
      if (input.id.substring(6) !== "") {
        setItem(
          `degreeid${input.id.substring(6)}`,
          input.options[input.selectedIndex].value
        );
        setItem(inputId, value);
      } else {
        setItem("degreeid", input.options[input.selectedIndex].value);
        setItem(inputId, value);
      }
    }
    setItem(inputId, value);
    updateOutput(inputId, value);
    if (value === "") {
      localStorage.removeItem(inputId);
    }
  });
}
listenAndStore(institute);
listenAndStore(eduDescription);
listenAndStore(dueDate);
listenAndStore(degree);

function validateOnClick(inputs) {
  inputs.forEach((input) => {
    let value = input.value;
    let inputId = input.id;
    if (inputId.includes("Degree")) {
      value = input.options[input.selectedIndex].innerText;
    }
    if (inputId.includes("Institute") || inputId.includes("eduDescription")) {
      validateInput(input, value);
    }
    if (inputId.includes("dueDate") || inputId.includes("Degree")) {
      validateSelectDate(input, value);
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
      if (degreeDropdown.options[i].innerText === degreeValue) {
        degreeDropdown.selectedIndex = i;
        break;
      }
    }
  }
}

function checkAdditionalExp(inputs) {
  inputs.forEach((input) => {
    let method = "keyup";
    if (input.id.includes("dueDate") || input.id.includes("Degree")) {
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

function clearValidation(inputs) {
  inputs.forEach((input) => {
    const label = document.querySelector(`label[for="${input.id}"]`);
    const iconContainer = document.getElementById(`icon-container-${input.id}`);
    input.classList.remove("invalid");
    label.classList.remove("invalid-label");
    if (iconContainer) {
      iconContainer.remove();
    }
  });
}

function validateAdditional(value, inputs) {
  nextBtn.addEventListener("click", function () {
    if (value === true) {
      validateOnClick(inputs);
    } else {
      clearValidation(inputs);
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

let keysToValidate = [];
let prefixes = ["Institute", "Degree", "eduDescription", "dueDate"];
let prefixMap = {};
function getAdditionalInputsEdu() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    prefixes.forEach((prefix) => {
      if (key.startsWith(prefix) && key.substring(prefix.length) !== "") {
        let value = getItem(key);
        let keyIndex = key.substring(prefix.length);
        if (!prefixMap[keyIndex]) prefixMap[keyIndex] = [];
        prefixMap[keyIndex].push(prefix + keyIndex);
        addEdu(keyIndex);
        fetchDegrees(keyIndex).then(() => {
          if (getItem(key) && key.includes("Degree")) {
            const degreeDropdown = document.getElementById(key);
            for (let i = 0; i < degreeDropdown.options.length; i++) {
              if (degreeDropdown.options[i].innerText === value) {
                degreeDropdown.selectedIndex = i;
                break;
              }
            }
          }
        });
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
      validateOnClick(keysToValidate);
    } else {
      clearValidation(keysToValidate);
    }
  }
}

function deleteDefaultDegree() {
  let prefix = "Degree";
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = getItem(key);
    if (key.startsWith(prefix) && key.substring(prefix.length) !== "") {
      if (value === "აირჩიეთ ხარისხი") localStorage.removeItem(key);
    }
  }
}

nextBtn.addEventListener("click", function () {
  validateOnClick(inputs);
  // getAdditionalInputsEdu();
  onClickValAdd();
  const invalidElements = document.querySelectorAll(".invalid");
  if (invalidElements.length === 0) {
    postData();
    console.log("valid");
  }
});

await fetchDegrees();
createHTML();
createExp();
getAdditionalInputs("exp");
deleteDefaultDegree();
createEdu();
getAllOutputs();
showDiv();
localEmptyClear();
showDivOnKeyUp(inputs, "eduContainer");
getLocalStorage();
getAdditionalInputsEdu();
