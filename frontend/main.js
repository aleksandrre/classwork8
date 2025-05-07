const getallCar = async () => {
  try {
    const response = await fetch("http://localhost:3001/car");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getOneCar = async () => {
  try {
    const carId = document.getElementById("input").value;
    const response = await fetch(`http://localhost:3001/car/${carId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
const wrapper = document.querySelector(".wrapper");
const displayCards = async () => {
  const wrapper = document.querySelector(".wrapper");

  const data = await getallCar();
  // console.log(data);
  data.cars.forEach((element) => {
    wrapper.innerHTML += `
     <div class="card">
        <h1>name : ${element.name}</h1>
        <h2>model : ${element.model}</h2>
        <p>year : ${element.year}</p>
        <p>price : ${element.price}</p>
      </div>
    `;
  });
};

displayCards();

const displayCard = async () => {
  wrapper.innerHTML = "";
  const data = await getOneCar();
  // console.log(data);

  wrapper.innerHTML += `
     <div class="card">
        <h1>name : ${data.car.name}</h1>
        <h2>model : ${data.car.model}</h2>
        <p>year : ${data.car.year}</p>
        <p>price : ${data.car.price}</p>
      </div>
    `;
};

const burgerIcon = document.querySelector(".icon");
const navbar = document.querySelector(".navbar");

let visible = 0;

burgerIcon.addEventListener("click", () => {
  if (visible === 0) {
    navbar.classList.add("active");
    visible = 1;
  } else {
    navbar.classList.remove("active");
    visible = 0;
  }
});
