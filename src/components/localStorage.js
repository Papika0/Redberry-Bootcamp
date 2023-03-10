function setItem(key, value) {
  localStorage.setItem(key, value);
}

function getItem(key) {
  return localStorage.getItem(key);
}

function updateOutput(input, value) {
  const outputElement = document.getElementById(input + "-output");
  if (outputElement) {
    if (input.includes("Position") || input.includes("Institute")) {
      outputElement.textContent = value + " , ";
    } else if (input.includes("startDate")) {
      outputElement.textContent = value + " -";
    } else {
      outputElement.textContent =
        input === "Phone" ? formatPhoneNumber(value) : value;
    }
  }
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
  localOutputCheck("Position");
  localOutputCheck("Company");
  localOutputCheck("startDate");
  localOutputCheck("endDate");
  localOutputCheck("expDescription");
  updatePhoto();
  localOutputCheck("Institute");
  localOutputCheck("Degree");
  localOutputCheck("eduDescription");
  localOutputCheck("dueDate");
}

function showDiv() {
  if (
    getItem("Position") ||
    getItem("Company") ||
    getItem("startDate") ||
    getItem("endDate") ||
    getItem("expDescription")
  ) {
    document.getElementById("expContainer").classList.remove("hidden-div");
  }
  if (
    getItem("Institute") ||
    getItem("Degree") ||
    getItem("eduDescription") ||
    getItem("dueDate")
  ) {
    if (document.getElementById("eduContainer"))
      document.getElementById("eduContainer").classList.remove("hidden-div");
  }
}

function localEmptyClear() {
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (localStorage.getItem(key) === "") {
      localStorage.removeItem(key);
    }
  }
}

function showDivOnKeyUp(inputs, id) {
  inputs.forEach((input) => {
    let method = "keyup";
    if (input.id === "startDate" || input.id === "endDate") {
      method = "change";
    }
    const expContainer = document.getElementById(id);
    input.addEventListener(method, function () {
      if (inputs.every((input) => input.value === "")) {
        if (!expContainer.classList.contains("hidden-div")) {
          expContainer.classList.add("hidden-div");
        }
      } else {
        expContainer.classList.remove("hidden-div");
      }
    });
  });
}

export {
  setItem,
  getItem,
  getAllOutputs,
  showHiddenFields,
  updateOutput,
  updatePhoto,
  hideHiddenFields,
  showDiv,
  localEmptyClear,
  showDivOnKeyUp,
};
