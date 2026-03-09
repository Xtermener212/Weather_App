const cityInput = document.querySelector('.js-cityInput');
const searchBtn = document.querySelector('.js-searchBtn');

const weatherInfoSection = document.querySelector('.weather-info');
const searchCitySection = document.querySelector('.js-searchCityContainer');
const notFoundSection = document.querySelector('.js-not-found');

const countryName = document.querySelector('.country-txt');
const currentDateTxt = document.querySelector('.current-date-txt');
const tempTxt = document.querySelector('.temp-txt');
const conditionTxt = document.querySelector('.condition-txt');
const humidityTxt = document.querySelector('.humidity-value-txt');
const windSpeedTxt = document.querySelector('.wind-speed-txt');
const weatherSummaryImg = document.querySelector('.weather-summary-img');

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
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);

    return response.json();
}

function getWeatherIcon(id){
    console.log(id);
    if (id <= 232) return 'thunderstorm.svg'
    if (id <= 321) return 'drizzle.svg'
    if (id <= 531) return 'rain.svg'
    if (id <= 622) return 'snow.svg'
    if (id <= 781) return 'atmosphere.svg'
    if (id <= 800) return 'clear.svg'
    else return 'clouds.svg'
}

function getCurrentDate(){
    const currentDate = new Date();
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }
    return currentDate.toLocaleDateString('en-GB', options);
}

async function updateWeatherInfo(city){
    const weatherData = await getFetchData('weather', city);

    if (weatherData.cod != 200){
        showDisplaySection(notFoundSection)
        return
    }

    const {
        name: country,
        main: { temp, humidity },
        weather: [{ id, main }],
        wind: {speed}
    } = weatherData;

    countryName.textContent = country;
    tempTxt.textContent = Math.round(temp)+' °C';
    conditionTxt.textContent = main;
    humidityTxt.textContent = humidity + '%';
    windSpeedTxt.textContent = speed + ' M/s';
    weatherSummaryImg.src = `assets/weather/${getWeatherIcon(id)}`
    currentDateTxt.textContent = getCurrentDate();
    
    

    console.log(weatherData);

    showDisplaySection(weatherInfoSection);
}

function showDisplaySection(section){
    const sections = 
        [
            weatherInfoSection,
            searchCitySection,
            notFoundSection
        ];

        sections.forEach(el => el.style.display = 'none');
    
    section.style.display = 'flex';
}

