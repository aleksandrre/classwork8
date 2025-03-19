const cards = document.getElementById("cards");

const getData = async () => {
  const response = await fetch("http://localhost:3001/data");
  const data = await response.json();
  cards.innerHTML = "";
  data.forEach((item) => {
    const card = document.createElement("div");
    card.innerHTML = `<h3>name:${item.name}</h3>
        <p>email:${item.email}</p>
        <p>password:${item.password}</p>`;
    card.classList.add("card");
    cards.appendChild(card);
  });
};
getData();

const btn = document.getElementById("btn");
const addItem = async () => {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const response = await fetch("http://localhost:3001/addItem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value,
    }),
  });
  const data = await response.json();
  console.log(data);
  getData();
  name.value = "";
  email.value = "";
  password.value = "";
};

btn.addEventListener("click", addItem);
