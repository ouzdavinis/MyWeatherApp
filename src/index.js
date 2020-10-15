function dateFormat(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}: ${minutes}`;
}

function searchTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempertatureElement = document.querySelector("span.degrees");
  let description = document.querySelector("#temp-description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = Math.round(response.data.wind.speed);
  let windSpeedElement = document.querySelector("#windSpeed");
  let dateCard = document.querySelector("span#date");
  let weatherIcon = document.querySelector("#icon");
  tempertatureElement.innerHTML = `${temperature}`;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = `${windSpeed}`;
  dateCard.innerHTML = dateFormat(response.data.dt * 1000);
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        |${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  let cityCard = document.querySelector("#searching-city");
  let apiSearch = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=8c149e474b0e340f79f353922c15bd8e`;
  if (searchInput.value) {
    cityCard.innerHTML = `${searchInput.value}`;
  } else {
    alert("Please Type City");
  }
  axios.get(apiSearch).then(searchTemperature);

  let apiForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput.value}&units=metric&appid=8c149e474b0e340f79f353922c15bd8e`;
  axios.get(apiForecast).then(displayForecast);
}

let myLocation = document.querySelector("#my-location");
myLocation.addEventListener("submit", search);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempertatureElement = document.querySelector("span.degrees");
  let description = document.querySelector("#temp-description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = Math.round(response.data.wind.speed);
  let windSpeedElement = document.querySelector("#windSpeed");
  let cityName = document.querySelector("#searching-city");
  let dateCard = document.querySelector("span#date");
  let weatherIcon = document.querySelector("#icon");
  tempertatureElement.innerHTML = `${temperature}`;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = `${windSpeed}`;
  cityName.innerHTML = response.data.name;
  dateCard.innerHTML = dateFormat(response.data.dt * 1000);
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=8c149e474b0e340f79f353922c15bd8e`;
  axios.get(apiUrl).then(showTemperature);

  let apiForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=8c149e474b0e340f79f353922c15bd8e`;
  axios.get(apiForecast).then(displayForecast);
}
function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentButton = document.querySelector("button.currentButton");
currentButton.addEventListener("click", showCurrentLocation);

function displayF(response) {
  let fTemp = Math.round((response.data.main.temp * 9) / 5 + 32);
  let displayF = document.querySelector("span.degrees");
  displayF.innerHTML = `${fTemp}`;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  let apiF = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=8c149e474b0e340f79f353922c15bd8e`;
  axios.get(apiF).then(displayF);
}

let fahrenheitLink = document.querySelector("#f");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function displayC(response) {
  let cTemp = Math.round(response.data.main.temp);
  let displayC = document.querySelector("span.degrees");
  displayC.innerHTML = `${cTemp}`;
}

function convertToCelsius(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  let apiF = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=8c149e474b0e340f79f353922c15bd8e`;
  axios.get(apiF).then(displayC);
}

let celsiusLink = document.querySelector("#c");
celsiusLink.addEventListener("click", convertToCelsius);

function displayFCurrent(response) {
  let currentFTemp = Math.round((response.data.main.temp * 9) / 5 + 32);
  let displayCurrentF = document.querySelector("span.degrees");
  displayCurrentF.innerHTML = `${currentFTemp}`;
}

function convertToFahrenheitCurrent(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiCurrentF = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=8c149e474b0e340f79f353922c15bd8e`;
  axios.get(apiCurrentF).then(displayFCurrent);
}

function fCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(convertToFahrenheitCurrent);
}

let fahrenheitLinkCurrent = document.querySelector("#f");
fahrenheitLinkCurrent.addEventListener("click", fCurrentLocation);

function displayCCurrent(response) {
  let currentCTemp = Math.round(response.data.main.temp);
  let displayCurrentC = document.querySelector("span.degrees");
  displayCurrentC.innerHTML = `${currentCTemp}`;
}

function convertToCelsiusCurrent(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiCurrentC = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=8c149e474b0e340f79f353922c15bd8e`;
  axios.get(apiCurrentC).then(displayCCurrent);
}

function cCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(convertToCelsiusCurrent);
}

let celsiusLinkCurrent = document.querySelector("#c");
celsiusLinkCurrent.addEventListener("click", cCurrentLocation);
