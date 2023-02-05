import { name, lastName, email, phoneNumber, aboutMe } from "./validation.js";

const photoInput = document.getElementById("photoInput");

export function setItem(key, value) {
  localStorage.setItem(key, value);
}

export function getItem(key) {
  return localStorage.getItem(key);
}

function createHTML() {
  let html = `
            <div class="name-lstname-div">
          <p id="Name-output" class="Name-output"></p>
          <p id="Lastname-output" class="Lastname-output"></p>
        </div>
        <img src="" id="displayedImage" class="displayedImage" />
        <div class="email-div">
          <img src="" id="email-logo" />
          <p id="Email-output" class="Email-output"></p>
        </div>
        <div class="phone-div">
          <img src="" id="phone-logo" />
          <p id="Phone-output" class="Phone-output"></p>
        </div>
        <div class="about-me-div">
          <h1 id="about-me">ჩემ შესახებ</h1>
          <p id="AboutMe-output" class="AboutMe-output"></p>
        </div>
        <img src="../../assets/icon/icon.svg" class="redberry-icon" />
  `;
  output.innerHTML = html;
}

export function updateOutput(input, value) {
  document.getElementById(input.id + "-output").textContent =
    input === phoneNumber ? formatPhoneNumber(value) : value;
}

function formatPhoneNumber(value) {
  return (
    value.slice(0, 4) +
    " " +
    value.slice(4, 7) +
    " " +
    value.slice(7, 10) +
    " " +
    value.slice(10, 13)
  );
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

function localOutputCheck(input) {
  if (getItem(input.id)) {
    updateOutput(input, getItem(input.id));
  }
}

function getAllOutputs() {
  localOutputCheck(name);
  localOutputCheck(lastName);
  localOutputCheck(email);
  localOutputCheck(phoneNumber);
  localOutputCheck(aboutMe);
}

function updatePhoto() {
  document.getElementById("displayedImage").src = getItem("Photo");
}

window.addEventListener("load", function () {
  createHTML();
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
