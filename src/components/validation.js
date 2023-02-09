function createSuccessIcon(id) {
  const iconContainer = document.createElement("div");
  iconContainer.id = `icon-container-${id}`;
  iconContainer.classList.add("icon");
  iconContainer.innerHTML = `<img src="../../../assets/images/success-icon.svg" />`;
  return iconContainer;
}

function createErrorIcon(id) {
  const iconContainer = document.createElement("div");
  iconContainer.id = `icon-container-${id}`;
  iconContainer.classList.add("icon");
  iconContainer.innerHTML = `<img src="../../../assets/images/error-icon.svg" />`;
  return iconContainer;
}

export { createSuccessIcon, createErrorIcon };
