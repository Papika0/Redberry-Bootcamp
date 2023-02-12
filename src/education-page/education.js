import {
  createHTML,
  createExp,
  createEdu,
} from "../components/cvHtmlCreate.js";
import {
  setItem,
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
    if (input.type === "date") {
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

function validateAndStore(input) {
  let method = "keyup";
  if (input === dueDate) {
    method = "change";
  }
  input.addEventListener(method, function () {
    setItem(input.id, input.value);
    updateOutput(input.id, input.value);
    if (input.value === "") {
      localStorage.removeItem(input.id);
    }
  });
}

validateAndStore(institute);
validateAndStore(eduDescription);
validateAndStore(dueDate);

backBtn.addEventListener("click", function () {
  window.location.href = "../experience-page/experience.html";
});

window.addEventListener("load", function () {
  fetchDegrees();
  createHTML();
  createExp();
  getAdditionalInputs();
  createEdu();
  getAllOutputs();
  showDiv();
  localEmptyClear();
  showDivOnKeyUp();
});
