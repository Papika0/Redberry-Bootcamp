function createHTML() {
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
        <div class="experience-container hidden-div" id="expContainer">
        <hr class="splitter"/>
          <div class="exp-div">
            <h1 class="exp-h1">გამოცდილება</h1>
            <div class="position-company">
              <p id="Position-output" class="Position-output"></p>
              <p id="Company-output" class="Company-output"></p>
            </div>
            <div class="date-div">
              <p id="startDate-output" class="startDate-output"></p>
              <p id="endDate-output" class="endDate-output"></p>
              </div>
            <p id="expDescription-output" class="exp-output"></p>
          </div>
        </div>
  `;
  document.getElementById("output").innerHTML = html;
}

export { createHTML };
