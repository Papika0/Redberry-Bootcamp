const experiences = [
  {
    position: localStorage.getItem("Position"),
    employer: localStorage.getItem("Company"),
    start_date: localStorage.getItem("startDate"),
    due_date: localStorage.getItem("endDate"),
    description: localStorage.getItem("expDescription"),
  },
];

const educations = [
  {
    institute: localStorage.getItem("Institute"),
    degree_id: localStorage.getItem("degreeid"),
    due_date: localStorage.getItem("dueDate"),
    description: localStorage.getItem("eduDescription"),
  },
];

function postData() {
  const url = "https://resume.redberryinternship.ge/api/cvs";
  const formData = new FormData();
  formData.append("name", localStorage.getItem("Name"));
  formData.append("surname", localStorage.getItem("Lastname"));
  formData.append("email", localStorage.getItem("Email"));
  formData.append("phone_number", localStorage.getItem("Phone"));
  for (let i in experiences) {
    formData.append(`experiences[${i}][position]}`, experiences[i].position);
    formData.append(`experiences[${i}][employer]}`, experiences[i].employer);
    formData.append(
      `experiences[${i}][start_date]}`,
      experiences[i].start_date
    );
    formData.append(`experiences[${i}][due_date]}`, experiences[i].due_date);
    formData.append(
      `experiences[${i}][description]}`,
      experiences[i].description
    );
  }
  for (let i in educations) {
    formData.append(`educations[${i}][institute]}`, educations[i].institute);
    formData.append(`educations[${i}][degree_id]}`, educations[i].degree_id);
    formData.append(`educations[${i}][due_date]}`, educations[i].due_date);
    formData.append(
      `educations[${i}][description]}`,
      educations[i].description
    );
  }
  formData.append("about_me", localStorage.getItem("AboutMe"));
  const photo = localStorage.getItem("Photo");
  if (photo) {
    const imageBlob = dataURLtoBlob(photo);
    formData.append("image", imageBlob, "image.jpg");
  }
  for (let obj of formData) {
    console.log(obj);
  }

  fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      contentType: "multipart/form-data",
      accept: "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error(text);
        });
      } else {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log("caught it!", err);
    });
}

function dataURLtoBlob(dataURL) {
  const parts = dataURL.split(";base64,");
  const contentType = parts[0].split(":")[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

export { postData };
