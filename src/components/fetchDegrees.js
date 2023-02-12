async function fetchDegrees() {
  try {
    const response = await fetch(
      "https://resume.redberryinternship.ge/api/degrees"
    );
    const data = await response.json();

    const options = data.map((item) => {
      return `<option value="${item.title}">${item.title}</option>`;
    });
    options.unshift(
      `<option value="" disabled selected>აირჩიეთ ხარისხი</option>`
    );
    document.getElementById("Degree").innerHTML = options.join("");
  } catch (error) {
    console.log(error);
  }
}

export { fetchDegrees };
