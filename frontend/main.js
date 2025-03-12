const getData = async () => {
  const response = await fetch("http://localhost:3001/data");
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
      name: "tesla",
      cylinder: 2,
      engine: "6.2",
    }),
  });
  const data = await response.json();
  console.log(data);
};

addItem();
