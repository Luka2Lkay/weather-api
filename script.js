
// DOM global stuff
const container = document.getElementById('container');
const form = document.querySelector('form');
const input = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const city = document.querySelector('.city');
const temp = document.querySelector('.temperature');
const feelsLike = document.querySelector('.feels-like');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

// functions

const showResults = () =>{

    if(input.value != ''){
        container.style.display = 'block';
        }else return;
}

const getData = () =>{

    showResults();

    //Promise
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=8be2b2b405cb17aaacc0a7213c9ef13b`;
    fetch(endpoint, {mode: 'cors'})
    .then(response => {
        return response.json()
    })
    
    .then(data =>{

        const tempCelcius = data['main']['temp'] - 273.15;
        const feelLikkeCelcius = data['main']['feels_like'] -273.15;
        city.textContent = data['name'];         // The name of the city
        temp.textContent = tempCelcius.toFixed(1);  // The value of the main property is an object that contains a temperature property
        feelsLike.textContent = feelLikkeCelcius.toFixed(1); // The value of the main property is an object that contains a feels_like property
        humidity.textContent = data['main']['humidity']; // The value of the main property is an object that contains a humidity property
        wind.textContent = data['wind']['speed'];  // The value of the wind property is an object that contains a speed property
    })
// Error handling
    .catch(() => {
    
        if(input.value != null){
            container.style.display = 'none';
            alert(`${input.value} does't exist! please check your spelling`)
        }  
    })
}

searchBtn.addEventListener('click', getData);



