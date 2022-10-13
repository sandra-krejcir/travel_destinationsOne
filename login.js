const url = "http://127.0.0.1:3000/";
const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const contact = {
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
  };

  loginUser(contact);
});

async function loginUser(contact) {
  const response = await fetch(url + "auth/login/profile", {
    method: "POST",
    body: JSON.stringify(contact),
    headers: { "Content-Type": "application/json" },
  });
  console.log(response.body);
  document.querySelector("#login-user").textContent = "Login successful!";
}
