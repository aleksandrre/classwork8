const cards = document.getElementById("cards");

const getData = async () => {
  console.log("getuser");

  const response = await fetch("http://localhost:3001/data");
  console.log(response);
  const data = await response.json();
  console.log(data);
};
getData();

const addItem = async () => {
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
};

addItem();
