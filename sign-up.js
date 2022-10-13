const url = "http://127.0.0.1:3000/";
const signUpForm = document.querySelector("#signUpForm");

signUpForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const contact = {
    firstname: document.querySelector("#first-name").value,
    lastname: document.querySelector("#last-name").value,
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
  };

  singData(contact);
});

async function singData(contact) {
  const response = await fetch(url + "auth/signUp", {
    method: "POST",
    body: JSON.stringify(contact),
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
  document.querySelector("#create-profile-msg").textContent =
    "Profile successfully created!";
}
