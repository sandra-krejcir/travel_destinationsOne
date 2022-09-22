const url = "http://127.0.0.1:3000/";

const destination = {
  title: "New code, how bout now 2",
  dateFrom: 2022 - 10 - 12,
  dateTo: 2022 - 10 - 15,
  description: "blabla",
  location: "here",
  country: "neverland",
  picture: "url",
};

window.addEventListener("load", async () => {
  console.log("hello");
  await getData();
  await putData();
  /*  await postData(); */
});

async function getData() {
  const response = await fetch(url);
  const body = await response.json();
  console.log(body);
  return body;
}

async function getSpecificContact(id) {
	const response = await fetch(url + id);
	const body = await response.json();
	return body;
}

async function putData(id, contact) {
  const response = await fetch(url + id, {
    method: "PUT",
    body: JSON.stringify(contact),
    headers: { "Content-Type": "application/json" },
  });
}

/* async function postData() {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(destination),
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
} */
