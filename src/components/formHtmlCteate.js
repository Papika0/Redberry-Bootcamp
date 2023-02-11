function createFormHTML(num) {
  const div = document.createElement("div");
  div.classList.add("additional-form");
  div.id = `form${num}`;
  let html = `
            <div class="position">
              <label for="Position${num}">თანამდებობა</label> <br />
              <input
                type="text"
                name="position"
                id="Position${num}"
                placeholder="დეველოპერი, დიზაინერი, ა.შ."
              />
              <h5>მინიმუმ 2 სიმბოლო</h5>
            </div>

            <div class="company">
              <label for="Company${num}">დამსაქმებელი</label> <br />
              <input
                type="text"
                name="company"
                id="Company${num}"
                placeholder="დამსაქმებელი"
              />
              <h5>მინიმუმ 2 სიმბოლო</h5>
            </div>

            <div class="dates">
              <div class="start-date">
                <label for="startDate${num}">დაწყების რიცხვი</label> <br />
                <input type="date" name="start-date" id="startDate${num}" />
              </div>

              <div class="end-date">
                <label for="endDate${num}">დამთავრების რიცხვი</label> <br />
                <input type="date" name="end-date" id="endDate${num}" />
              </div>
            </div>

            <div class="exp-description">
              <label for="expDescription${num}">აღწერა</label><br />
              <textarea
                name="description"
                id="expDescription${num}"
                placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
              ></textarea>
            </div>
            <hr class="form-splitter" />
  `;
  div.innerHTML = html;
  document.getElementById("addBtnContainer").appendChild(div);
}

export { createFormHTML };
