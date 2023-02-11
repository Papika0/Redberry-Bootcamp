function createHTML() {
  const div = document.createElement("div");
  div.classList.add("infoDiv");
  let html = `
        <div class="name-lstname-div">
          <p id="Name-output" class="Name-output"></p>
          <p id="Lastname-output" class="Lastname-output"></p>
        </div>
        <img src="" id="displayedImage" class="displayedImage" />
        <div class="email-div">
          <img src="../../assets/images/email-icon.svg" id="email-icon" />
          <p id="Email-output" class="Email-output"></p>
        </div>
        <div class="phone-div">
          <img src="../../assets/images/phone-icon.svg" id="phone-icon" />
          <p id="Phone-output" class="Phone-output"></p>
        </div>
        <div class="about-me-div" id="aboutMeDiv">
          <h1 id="about-me">ჩემ შესახებ</h1>
          <p id="AboutMe-output" class="AboutMe-output"></p>
        </div>
        
  `;
  div.innerHTML = html;
  document.getElementById("output").appendChild(div);
}

function createExp(num) {
  let hidden = "";
  let expHeader = "";
  if (!num) {
    num = "";
    hidden = "hidden-div";
    expHeader = `<hr class="splitter"/>
            <h1 class="exp-h1">გამოცდილება</h1>`;
  }
  const div = document.createElement("div");
  div.classList.add("exp-div");
  div.id = `exp-div${num}`;
  let html = `
        <div class="experience-container ${hidden}" id="expContainer${num}">
        ${expHeader}
            <div class="position-company">
              <p id="Position${num}-output" class="Position-output"></p>
              <p id="Company${num}-output" class="Company-output"></p>
            </div>
            <div class="date-div">
              <p id="startDate${num}-output" class="startDate-output"></p>
              <p id="endDate${num}-output" class="endDate-output"></p>
              </div>
            <p id="expDescription${num}-output" class="exp-output"></p>
          </div>
       
  `;
  div.innerHTML = html;
  document.getElementById("output").appendChild(div);
}

export { createHTML, createExp };
