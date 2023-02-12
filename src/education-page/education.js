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
import { fetchDegrees } from "../components/fetchDegrees.js";
import { getAdditionalInputs } from "../components/getAdditional.js";

const institute = document.getElementById("Institute");
const degree = document.getElementById("Degree");
const eduDescription = document.getElementById("eduDescription");
const dueDate = document.getElementById("dueDate");

const backBtn = document.getElementById("back-btn");

function showDivOnKeyUp() {
  const inputs = [institute, eduDescription, dueDate, degree];
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
  if (input === dueDate || input === degree) {
    method = "change";
  }
  input.addEventListener(method, function () {
    let value = input.value;
    if (input === degree) {
      value = input.options[input.selectedIndex].text;
    }
    setItem(input.id, value);
    updateOutput(input.id, value);
    if (value === "") {
      localStorage.removeItem(input.id);
    }
  });
}

listenAndStore(institute);
listenAndStore(eduDescription);
listenAndStore(dueDate);
listenAndStore(degree);

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

backBtn.addEventListener("click", function () {
  window.location.href = "../experience-page/experience.html";
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
