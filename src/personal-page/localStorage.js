import { name, lastName, email, phoneNumber, aboutMe } from "./validation.js";
import { createHTML, createExp } from "../components/cvHtmlCreate.js";
import {
  setItem,
  getItem,
  getAllOutputs,
  updatePhoto,
  showDiv,
  updateOutput,
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

function getAdditionalInputs() {
  let prefixes = [
    "Position",
    "Company",
    "expDescription",
    "startDate",
    "endDate",
  ];
  let keyIndex = 0;
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    prefixes.forEach((prefix) => {
      if (key.startsWith(prefix) && key.substring(prefix.length) !== "") {
        let value = localStorage.getItem(key);
        if (value !== "") {
          keyIndex = key.substring(prefix.length);
        } else keyIndex = 0;
      }
    });
  }
  if (keyIndex !== 0) {
    createExp(keyIndex);
    prefixes.forEach((prefix) => {
      let key = prefix + keyIndex;
      let value = localStorage.getItem(key);
      updateOutput(key, value);
    });
  }
}

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
  getAdditionalInputs();
});
