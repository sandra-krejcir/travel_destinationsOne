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

// function inputDate(dbDate) {
// 	let date = new Date(dbDate).getDate();
// 	let month = new Date(dbDate).getMonth() + 1;
// 	const year = new Date(dbDate).getFullYear();

// 	if (date < 10) date = "0" + date;
// 	if (month < 10) month = "0" + month;

// 	showDate = date + "-" + month + "-" + year;
// 	return showDate;
// }

function displayDate(dbDate) {
	const nth = function(d) {
		if (d > 3 && d < 21) return 'th';
		switch (d % 10) {
			case 1:  return "st";
			case 2:  return "nd";
			case 3:  return "rd";
			default: return "th";
		}
	};

	const dateObj = new Date(dbDate);
	
	const date = dateObj.getDate();
	const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][dateObj.getMonth()];
	const year = dateObj.getFullYear();

	dateString = month + ' ' + date + nth(date) + ' ' + year;
	return dateString;
}

function showDestinations(contact) {
  const template = document.querySelector("#theList").content;
  const copy = template.cloneNode(true);
  copy.querySelector("div").setAttribute("id", contact._id);
  copy.querySelector("h2").textContent = contact.title;
  copy.querySelector(".dates").textContent = displayDate(contact.dateFrom) + ' - ' + displayDate(contact.dateTo);
  copy.querySelector(".description").textContent = contact.description.substr(0, 99);
  if (contact.description.length > 100) copy.querySelector(".description").textContent += " ...";
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
