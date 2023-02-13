import {
  createEdu,
  createExp,
  createHTML,
} from "../components/cvHtmlCreate.js";
const postData = JSON.parse(localStorage.getItem("postData"));
const closeBtn = document.getElementById("closeBtn");

function displayInfo(postData) {
  createHTML();
  if (postData.about_me !== "" && postData.about_me !== undefined) {
    document.querySelector(".about-me-div").style.visibility = "visible";
  }

  document.getElementById("Name-output").innerHTML = postData.name;
  document.getElementById("Lastname-output").innerHTML = postData.surname;
  document.getElementById("Email-output").innerHTML = postData.email;
  document.getElementById("Phone-output").innerHTML = postData.phone_number;
  document.getElementById("AboutMe-output").innerHTML = postData.about_me;

  document.getElementById(
    "displayedImage"
  ).src = `https://resume.redberryinternship.ge/${postData.image}`;
}

function displayExperienceData(postData) {
  if (postData.experiences.length > 0) {
    createExp();
    document.getElementById("Position-output").innerHTML =
      postData.experiences[0].position + ",";
    document.getElementById("Company-output").innerHTML =
      postData.experiences[0].employer;
    document.getElementById("startDate-output").innerHTML =
      postData.experiences[0].start_date + " -";
    document.getElementById("endDate-output").innerHTML =
      postData.experiences[0].due_date;
    document.getElementById("expDescription-output").innerHTML =
      postData.experiences[0].description;

    for (let i = 1; i < postData.experiences.length; i++) {
      createExp(i);
      document.getElementById(`Position${i}-output`).innerHTML =
        postData.experiences[i].position + ",";
      document.getElementById(`Company${i}-output`).innerHTML =
        postData.experiences[i].employer;
      document.getElementById(`startDate${i}-output`).innerHTML =
        postData.experiences[i].start_date + " -";
      document.getElementById(`endDate${i}-output`).innerHTML =
        postData.experiences[i].due_date;
      document.getElementById(`expDescription${i}-output`).innerHTML =
        postData.experiences[i].description;
    }
  }
}

function displayEducationData(postData) {
  if (postData.educations.length > 0) {
    createEdu();
    document.getElementById("Institute-output").innerHTML =
      postData.educations[0].institute + ",";
    document.getElementById("Degree-output").innerHTML =
      postData.educations[0].degree;
    document.getElementById("dueDate-output").innerHTML =
      postData.educations[0].due_date;
    document.getElementById("eduDescription-output").innerHTML =
      postData.educations[0].description;

    for (let i = 1; i < postData.educations.length; i++) {
      createEdu(i);
      document.getElementById(`Institute${i}-output`).innerHTML =
        postData.educations[i].institute + ",";
      document.getElementById(`Degree${i}-output`).innerHTML =
        postData.educations[i].degree;
      document.getElementById(`dueDate${i}-output`).innerHTML =
        postData.educations[i].due_date;
      document.getElementById(`eduDescription${i}-output`).innerHTML =
        postData.educations[i].description;
    }
  }
}
displayInfo(postData);
displayExperienceData(postData);
displayEducationData(postData);

document.querySelectorAll(".hidden-div").forEach((div) => {
  div.classList.remove("hidden-div");
});

closeBtn.addEventListener("click", () => {
  document.querySelector(".pop-up").style.display = "none";
});
