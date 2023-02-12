import { createExp } from "./cvHtmlCreate.js";
import { updateOutput } from "./localStorage.js";

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

export { getAdditionalInputs };
