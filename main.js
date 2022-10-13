const url = "http://127.0.0.1:3000/";

window.addEventListener("load", async () => {
  let data = await getData();
  console.log(data);

  data.forEach((contact) => showDestinations(contact));
});

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

async function postData(contact) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(contact),
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
  document.querySelector("#submitMessage").textContent =
    "Destination successfully posted!";

  document.querySelector("#destinationList").innerHTML = "";
  let newData = await getData();
  newData.forEach((contact) => showDestinations(contact));
}

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

  copy.querySelector("#delete-button").addEventListener("click", () => {
    //console.log(contact._id);
    deleteData(contact._id);
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

async function deleteData(id) {
  fetch(url + id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  // return document.querySelector(`#${id}`).remove();
}
