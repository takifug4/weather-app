//                                                SEARCHABLE INNERHTML TEMP + FARENHEIT
function showTemperature(response) {
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let windOne = document.querySelector("#wind");
  let currentWind = Math.round(response.data.wind.speed);
  windOne.innerHTML = currentWind;

  console.log(response);

  let humidityOne = document.querySelector("#humidity");
  let currentHumidity = Math.round(response.data.main.humidity);
  humidityOne.innerHTML = currentHumidity;

  let thatTemp = document.querySelector("#exact-temp-id");
  let temperature = Math.round(response.data.main.temp);
  thatTemp.innerHTML = `${temperature}°`;
  (function () {
    var count = 0;
    document
      .querySelector(".tempButton")
      .addEventListener("click", function () {
        if (count == 0) {
          let farTemp = `${temperature}` * 1.8 + 32;
          thatTemp.innerHTML = `${farTemp.toFixed()}°F`;
          count++;
        } else if (count == 1) {
          thatTemp.innerHTML = `${temperature}°`;
          count = 0;
        }
      });
  })();
}

//                      kinda figured out how to include a c° to f° button in the way i builded that function and for now i'll stick to it 'cause i'm not sure what way would be used is next lessons

//                                      type a name of a city with innerHTMl by the search button/ SEARCHABLE
function searching(event) {
  event.preventDefault();
  let searchingInput = document.querySelector("#search-tool");
  let thatCity = document.querySelector("#city-in-question");
  thatCity.innerHTML = searchingInput.value;
  if (searchingInput.value.length == 0) {
    thatCity.innerHTML = "Kyiv";
  }
  let apiKey = `8d2d1c8840407c6b6f6d05d74b3f12c9`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchingInput.value}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

let searchCity = document.querySelector("#searching-city-tool");
searchCity.addEventListener("submit", searching);

//                                                    GEO INNER HTML + FARENHEIT
function showTemperatureGeo(response) {
  let windOne = document.querySelector("#wind");
  let currentWind = Math.round(response.data.wind.speed);
  windOne.innerHTML = currentWind;

  let humidityOne = document.querySelector("#humidity");
  let currentHumidity = Math.round(response.data.main.humidity);
  humidityOne.innerHTML = currentHumidity;
  let currentPosition = response.data.name;
  let cityGeo = document.querySelector("#city-in-question");
  cityGeo.innerHTML = currentPosition;
  console.log(response);
  let thatTemp = document.querySelector("#exact-temp-id");
  let temperature = Math.round(response.data.main.temp);
  thatTemp.innerHTML = `${temperature}°`;
  (function () {
    var count = 0;
    document
      .querySelector(".tempButton")
      .addEventListener("click", function () {
        if (count == 0) {
          let farTemp = `${temperature}` * 1.8 + 32;
          thatTemp.innerHTML = `${farTemp.toFixed()}°F`;
          count++;
        } else if (count == 1) {
          thatTemp.innerHTML = `${temperature}°`;
          count = 0;
        }
      });
  })();
}

//                                        guess a name of a city w/ geolocation function /GEO
function exactPosition(position) {
  let apiKey = `8d2d1c8840407c6b6f6d05d74b3f12c9`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemperatureGeo);
}

function geoFun() {
  navigator.geolocation.getCurrentPosition(exactPosition);
}
document.querySelector("#geoguesser-id").addEventListener("click", geoFun);

//                                        current date on site NEED TO IMPROOVE

function workingClock() {
  let now = new Date();
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
  let currentDay = document.querySelector("#cur-date");
  let currentTime = document.querySelector("#time");
  currentDay.innerHTML = `${day}`;
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  currentTime.innerHTML = `${hours}:${minutes}`;
  setTimeout("workingClock()", 1000);
}

workingClock();

function searchingDefault() {
  let defaultCity = "Kyiv";
  let apiKey = `8d2d1c8840407c6b6f6d05d74b3f12c9`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
searchingDefault();

//                     alert functions kinda old and usefull for web project but still i can reread and take some advices from here. TO DELETE LATER
/* let city = prompt("Enter a city");
city = city.toLowerCase().trim();

if (weather[city] !== undefined) {
  let temperature = weather[city].temp;
  let humidity = weather[city].humidity;

  alert(
    `It's currently a ${temperature} °C in ${city} with a ${humidity}% of humidity`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}
 */
