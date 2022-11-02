const container = document.getElementById("container");
const form = document.querySelector("form");
const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const city = document.querySelector(".city");
const temp = document.querySelector(".temperature");
const feelsLike = document.querySelector(".feels-like");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

const showResults = () => {
  if (input.value != "") {
    container.style.display = "block";
  } else return;
};

const getData = () => {
  showResults();

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=8be2b2b405cb17aaacc0a7213c9ef13b`;
  fetch(endpoint, { mode: "cors" })
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      const tempCelcius = data["main"]["temp"] - 273.15;
      const feelLikeCelcius = data["main"]["feels_like"] - 273.15;
      city.textContent = data["name"];
      temp.textContent = tempCelcius.toFixed(1);
      feelsLike.textContent = feelLikeCelcius.toFixed(1);
      humidity.textContent = data["main"]["humidity"];
      wind.textContent = data["wind"]["speed"];
    })

    .catch(() => {
      if (input.value != null) {
        container.style.display = "none";
        alert(`${input.value} does't exist! please check your spelling`);
      }
    });
};

searchBtn.addEventListener("click", getData);
