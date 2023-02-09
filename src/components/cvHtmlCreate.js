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
        <img src="../../assets/icon/icon.svg" class="redberry-icon" />
  `;
  document.getElementById("output").innerHTML = html;
}

export { createHTML };
