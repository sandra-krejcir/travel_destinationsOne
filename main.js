const url = "http://127.0.0.1:3000/";

window.addEventListener("load", async () => {
  const data = await getData();
  console.log(data);
  /*  await putData(); */
  /*  await postData(); */

  data.forEach((contact) => showDestinations(contact));

  function showDestinations(contact) {
    const template = document.querySelector("#theList").content;
    const copy = template.cloneNode(true);
    copy.querySelector("div").setAttribute("id", contact._id);
    copy.querySelector("h2").textContent = contact.title;
    copy.querySelector("p").textContent = contact.description;
    copy.querySelector("#edit-button").addEventListener("click", () => {
      window.location.replace(
        "http://127.0.0.1:3000/update.html?id=" + contact._id
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

  /* async function putData() {
  const response = await fetch(url + "632c3f1be961e63b4bd0e5a4", {
    method: "PUT",
    body: JSON.stringify(destination),
    headers: { "Content-Type": "application/json" },
  });
}
 */
  /* async function postData() {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(destination),
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
} */
});
