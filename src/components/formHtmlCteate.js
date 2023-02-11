function createFormHTML() {
  const div = document.createElement("div");
  div.classList.add("additional-form");
  let html = `
            <div class="position">
              <label for="Position">თანამდებობა</label> <br />
              <input
                type="text"
                name="position"
                id="Position"
                placeholder="დეველოპერი, დიზაინერი, ა.შ."
              />
              <h5>მინიმუმ 2 სიმბოლო</h5>
            </div>

            <div class="company">
              <label for="Company">დამსაქმებელი</label> <br />
              <input
                type="text"
                name="company"
                id="Company"
                placeholder="დამსაქმებელი"
              />
              <h5>მინიმუმ 2 სიმბოლო</h5>
            </div>

            <div class="dates">
              <div class="start-date">
                <label for="startDate">დაწყების რიცხვი</label> <br />
                <input type="date" name="start-date" id="startDate" />
              </div>

              <div class="end-date">
                <label for="endDate">დამთავრების რიცხვი</label> <br />
                <input type="date" name="end-date" id="endDate" />
              </div>
            </div>

            <div class="exp-description">
              <label for="expDescription">აღწერა</label><br />
              <textarea
                name="description"
                id="expDescription"
                placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
              ></textarea>
            </div>
            <hr class="form-splitter" />
  `;
  div.innerHTML = html;
  document.getElementById("addBtnContainer").appendChild(div);
}

export { createFormHTML };
