import { name, lastName, email, phoneNumber, aboutMe } from "./validation.js";

const photoInput = document.getElementById("photoInput");
const displayedImage = document.getElementById("displayedImage");

export function setItem(key, value) {
  localStorage.setItem(key, value);
}

export function getItem(key) {
  return localStorage.getItem(key);
}

export function updateOutput(input, value) {
  if (!document.getElementById(input.id + "-output")) {
    const p = document.createElement("p");
    p.className = input.id + "-output";
    p.id = input.id + "-output";
    p.textContent = value;
    output.appendChild(p);
  } else {
    document.getElementById(input.id + "-output").textContent = value;
  }
}

function updatePhoto() {
  if (!document.getElementById("displayedImage")) {
    const img = document.createElement("img");
    img.className = "displayedImage";
    img.id = "displayedImage";
    img.src = getItem("Photo");
    output.appendChild(img);
  } else {
    document.getElementById("displayedImage").src = getItem("Photo");
  }
}

function localOutputCheck(input) {
  if (getItem(input.id)) {
    updateOutput(input, getItem(input.id));
  }
}

photoInput.addEventListener("change", function () {
  const file = photoInput.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    setItem("Photo", reader.result);
    updatePhoto();
  });

  reader.readAsDataURL(file);
});

function getAllOutputs() {
  localOutputCheck(name);
  localOutputCheck(lastName);
  localOutputCheck(email);
  localOutputCheck(phoneNumber);
  localOutputCheck(aboutMe);
}

window.addEventListener("load", function () {
  name.value = getItem("Name");
  lastName.value = getItem("Lastname");
  email.value = getItem("Email");
  phoneNumber.value = getItem("Phone");
  aboutMe.value = getItem("AboutMe");
  if (getItem("Photo")) {
    updatePhoto();
  }
  getAllOutputs();
});
