const cityInput = document.querySelector('.js-cityInput');
const searchBtn = document.querySelector('.js-searchBtn');

const apiKey = 'cd31475b98ca6c0461f6c12f5ef93f2d';

searchBtn.addEventListener('click', () => {
    if(cityInput.value.trim() != ''){
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
});
cityInput.addEventListener('keydown', (event) => {
    if(event.key == 'Enter' && cityInput.value.trim() != ''){
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
});

async function getFetchData(endPoint, city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    return response.json();
}

async function updateWeatherInfo(city){
    const weatherData = await getFetchData('weather', city);
    console.log(weatherData);
}

