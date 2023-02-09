import { createHTML } from "../components/cvHtmlCreate.js";
import { getAllOutputs } from "../components/localStorage.js";
const backBtn = document.getElementById("back-btn");

window.addEventListener("load", function () {
  createHTML();
  getAllOutputs();
});

backBtn.addEventListener("click", function () {
  window.location.href = "../personal-page/personal.html";
});
