function setItem(key, value) {
  localStorage.setItem(key, value);
}

function getItem(key) {
  return localStorage.getItem(key);
}

function updateOutput(input, value) {
  document.getElementById(input + "-output").textContent =
    input === "Phone" ? formatPhoneNumber(value) : value;
}

function updatePhoto() {
  if (getItem("Photo")) {
    const photo = document.getElementById("displayedImage");
    photo.src = getItem("Photo");
    photo.style.visibility = "visible";
  }
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

function localOutputCheck(input) {
  if (getItem(input)) {
    updateOutput(input, getItem(input));
    showHiddenFields(input);
  }
}

function showHiddenFields(input, value) {
  if (input == "Email") {
    document.getElementById("email-icon").style.visibility = "visible";
  } else if (input == "Phone") {
    document.getElementById("phone-icon").style.visibility = "visible";
  } else if (input == "AboutMe") {
    document.getElementById("aboutMeDiv").style.visibility = "visible";
  }
  if (value == "" && input == "AboutMe") {
    document.getElementById("aboutMeDiv").style.visibility = "hidden";
  }
}

function hideHiddenFields(input) {
  if (input == "Email") {
    document.getElementById("email-icon").style.visibility = "hidden";
  } else if (input == "Phone") {
    document.getElementById("phone-icon").style.visibility = "hidden";
  } else if (input == "AboutMe") {
    document.getElementById("aboutMeDiv").style.visibility = "hidden";
  }
}

function getAllOutputs() {
  localOutputCheck("Name");
  localOutputCheck("Lastname");
  localOutputCheck("Email");
  localOutputCheck("Phone");
  localOutputCheck("AboutMe");
  updatePhoto();
}

export {
  setItem,
  getItem,
  getAllOutputs,
  showHiddenFields,
  updateOutput,
  updatePhoto,
  hideHiddenFields,
};
