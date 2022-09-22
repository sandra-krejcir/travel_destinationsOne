const url = "http://127.0.0.1:3000/";

const form = document.querySelector("#theForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const contact = {
    title: document.querySelector("#title").value,
    dateFrom: document.querySelector("#dateFrom").value,
    dateTo: document.querySelector("#dateTo").value,
    description: document.querySelector("#description").value,
    location: document.querySelector("#location").value,
    country: document.querySelector("#country").value,
    picture: document.querySelector("#picture").value,
  };

  postData(contact);
});

/* async function getData() {
  const response = await fetch(url);
  const body = await response.json();
  console.log(body);
  return body;
} */

/* async function putData() {
  const response = await fetch(url + "632c3f1be961e63b4bd0e5a4", {
    method: "PUT",
    body: JSON.stringify(contact),
    headers: { "Content-Type": "application/json" },
  });
} */

async function postData(contact) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(contact),
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
}
