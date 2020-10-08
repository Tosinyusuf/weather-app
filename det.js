const api = {
    key: "1f362a19240b5b327d7d331beb507230",
    base: "https://api.openweathermap.org/data/2.5/"
}
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13){
        getResults(searchbox.value);
    }     
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder (d) {
    let months =["January", "February", "March", "Aprill", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["sunday", "Monday", "tuesday", "wednessday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month =months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}


if ('serviceWorker' in navigator) {
    window.addEventListener('load',() => {
        navigator.serviceWorker
        .register('../sw_weather_ap.js')
        .then(reg => console.log('Service Worker: Registered'))
        .catch(err => console.log(`service Worker Error: ${err}`))
    })
}
