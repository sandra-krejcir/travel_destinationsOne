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
  /* await getData(); */
  await putData();
  /*  await postData(); */
});

/* async function getData() {
  const response = await fetch(url);
  const body = await response.json();
  console.log(body);
  return body;
} */

async function putData() {
  const response = await fetch(url + "632c3f1be961e63b4bd0e5a4", {
    method: "PUT",
    body: JSON.stringify(destination),
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
