const url = "http://127.0.0.1:3000/";

window.addEventListener("load", async function () {
  const id = getIdFromUrl();
  const contact = await getSpecificContact(id);
  fillInTheForm(contact);
});

function getIdFromUrl() {
  const location = window.location.toString();
  const splitQuestionmark = location.split("?");
  const routeParams = splitQuestionmark[1];
  const splitIdParam = routeParams.split("=");
  return splitIdParam[1];
}

async function getSpecificContact(id) {
  console.log(url, id);
  const response = await fetch(url + id);
  const body = await response.json();
  return body;
}

function fillInTheForm(contact) {
  console.log(contact);
  document.querySelector("#title").value = contact.title;
  document.querySelector("#dateFrom").value = contact.dateFrom;
  document.querySelector("#dateTo").value = contact.dateTo;
  document.querySelector("#description").value = contact.description;
  document.querySelector("#location").value = contact.location;
  document.querySelector("#country").value = contact.country;
  document.querySelector("#picture").value = contact.picture;
}

const form = document.querySelector("#theForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // console.log("hi, form is submitted");

  const contact = {
    title: document.querySelector("#title").value,
    dateFrom: document.querySelector("#dateFrom").value,
    dateTo: document.querySelector("#dateTo").value,
    description: document.querySelector("#description").value,
    location: document.querySelector("#location").value,
    country: document.querySelector("#country").value,
    picture: document.querySelector("#picture").value,
  };

  const id = getIdFromUrl();

  putData(id, contact);
  clearForm();
  document.querySelector("#submitMessage").textContent =
    "Destination successfully updated!";
});

async function putData(id, contact) {
  const response = await fetch(url + id, {
    method: "PUT",
    body: JSON.stringify(contact),
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
}

function clearForm() {
  document.querySelector("#title").value = "";
  document.querySelector("#dateFrom").value = "";
  document.querySelector("#dateTo").value = "";
  document.querySelector("#description").value = "";
  document.querySelector("#location").value = "";
  document.querySelector("#country").value = "";
  document.querySelector("#picture").value = "";
}
