function createSuccessIcon(id) {
  const iconContainer = document.createElement("div");
  iconContainer.id = `icon-container-${id}`;
  iconContainer.classList.add("icon");
  iconContainer.innerHTML = `<img src="../../assets/images/success-icon.svg" />`;
  return iconContainer;
}

function createErrorIcon(id) {
  const iconContainer = document.createElement("div");
  iconContainer.id = `icon-container-${id}`;
  iconContainer.classList.add("icon");
  iconContainer.innerHTML = `<img src="../../assets/images/error-icon.svg" />`;
  return iconContainer;
}

function validateInput(input) {
  const label = document.querySelector(`label[for="${input.id}"]`);
  const inputId = input.id;
  const iconContainer = document.getElementById(`icon-container-${inputId}`);
  if (inputId === "expDescription" && input.value.length !== 0) {
    input.classList.remove("invalid");
    input.classList.add("valid");
  } else if (inputId === "expDescription" && input.value.length === 0) {
    input.classList.remove("valid");
    input.classList.add("invalid");
  }
  if (input.value.length >= 2) {
    input.classList.remove("invalid");
    input.classList.add("valid");
    label.classList.remove("invalid-label");
    if (iconContainer) {
      iconContainer.remove();
    }
    input.parentNode.insertBefore(
      createSuccessIcon(inputId),
      input.nextSibling
    );
  } else {
    if (iconContainer) {
      iconContainer.remove();
    }
    input.parentNode.insertBefore(createErrorIcon(inputId), input.nextSibling);
    input.classList.remove("valid");
    input.classList.add("invalid");
    label.classList.add("invalid-label");
  }
}

export { createSuccessIcon, createErrorIcon, validateInput };
