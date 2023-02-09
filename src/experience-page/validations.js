import { createHTML } from "../components/cvHtmlCreate.js";
import { getAllOutputs } from "../components/localStorage.js";

window.addEventListener("load", function () {
  createHTML();
  getAllOutputs();
});
