import { name, lastName, email, phoneNumber, aboutMe } from "./validation.js";
import { createHTML, createExp } from "../components/cvHtmlCreate.js";
import {
  setItem,
  getItem,
  getAllOutputs,
  updatePhoto,
  showDiv,
  localEmptyClear,
} from "../components/localStorage.js";

const photoInput = document.getElementById("photoInput");

photoInput.addEventListener("change", function () {
  const file = photoInput.files[0];
  const reader = new FileReader();
  document.getElementById("displayedImage").style.visibility = "visible";

  reader.addEventListener("load", function () {
    setItem("Photo", reader.result);
    updatePhoto();
  });

  reader.readAsDataURL(file);
});

window.addEventListener("load", function () {
  createHTML();
  createExp();
  name.value = getItem("Name");
  lastName.value = getItem("Lastname");
  email.value = getItem("Email");
  phoneNumber.value = getItem("Phone");
  aboutMe.value = getItem("AboutMe");
  getAllOutputs();
  showDiv();
  localEmptyClear();
});
