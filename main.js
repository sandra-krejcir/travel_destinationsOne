const url = "http://127.0.0.1:3000/";

const form = document.querySelector("#theForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  document.querySelector("#destinationList").innerHTML = "";
  const data = await getData();
  data.forEach((contact) => showDestinations(contact));

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

async function postData(contact) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(contact),
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
  document.querySelector("#submitMessage").textContent =
    "Destination successfully posted!";
}

window.addEventListener("load", async () => {
  const data = await getData();
  console.log(data);

  data.forEach((contact) => showDestinations(contact));
});

function showDestinations(contact) {
  const template = document.querySelector("#theList").content;
  const copy = template.cloneNode(true);
  copy.querySelector("div").setAttribute("id", contact._id);
  copy.querySelector("h2").textContent = contact.title;
  copy.querySelector("p").textContent = contact.description;
  copy.querySelector("#edit-button").addEventListener("click", () => {
    window.location.replace(
      "http://127.0.0.1:5500/update.html?id=" + contact._id
    );
  });
  const parent = document.querySelector("#destinationList");
  parent.appendChild(copy);
}

async function getData() {
  const response = await fetch(url);
  const body = await response.json();
  console.log(body);
  return body;
}
