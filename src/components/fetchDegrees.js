async function fetchDegrees(num) {
  if (!num) num = "";
  try {
    const response = await fetch(
      "https://resume.redberryinternship.ge/api/degrees"
    );
    const data = await response.json();

    const options = data.map((item) => {
      return `<option value="${item.id}">${item.title}</option>`;
    });
    options.unshift(`<option value="" selected>აირჩიეთ ხარისხი</option>`);
    document.getElementById(`Degree${num}`).innerHTML = options.join("");
  } catch (error) {
    console.log(error);
  }
}

export { fetchDegrees };
