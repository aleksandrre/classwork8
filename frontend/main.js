const getData = async () => {
  console.log("getuser");

  const response = await fetch("http://localhost:3001/data");
  const data = await response.json();
  return data.data;
};

const btn = document.getElementById("btn");
const addUser = async () => {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  console.log("adduser");
  const response = await fetch("http://localhost:3001/addUser", {
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
  return data;
};

const cards = document.getElementById("cards");

const showCards = async () => {
  await addUser();
  const data = await getData();
  cards.innerHTML = "";
  data.forEach((user) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <h3>${user.name}</h3>
    <p>Email: ${user.email}</p>
    <p>Password: ${user.password}</p>
    
    `;
    cards.appendChild(card);
  });
};

btn.addEventListener("click", showCards);
