function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = "05{hours}";
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getday()];

  if (hours > 11) {
    return `${day} ${hours}:${minutes}`;
  } else {
    return `${day} ${hours}:${minutes}`;
  }
}

function formatday(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function search(city) {
  let endpoint = "api.openweathermap.org";
  let apiKey = "e399156459a95a7ca0de1a333acc798d";
  let apiUrl = `https://${endpoint}/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("city-input");
  search(cityInput.value);
}

function getForcast(coordinates) {
  console.log(coordinates);
  let apiKey = "e399156459a95a7ca0de1a333acc798d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
}

function displayTemperature(response) {
  let temperature = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#weather-icon");

  let humidityData = response.data.main.humidity;
  let fahrenheitTemperature = Math.round(response.data.main.temp);
  let windSpeed = response.data.wind.speed;

  let tempMessage = `Temperature: ${fahrenheitTemperature}°`;
  let windSpeedMessage = `Speed: ${windSpeed} mph`;
  let humidityMessage = `Humidity: ${humidityData}%`;

  wind.innerHTML = windSpeedMessage;
  humidity.innerHTML = humidityMessage;
  temperature.innerHTML = tempMessage;

  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].desciption;
  dataElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weekForecast");
  console.log(forecastElement);
  let forecastHTML = `<div class="row" id="forecast-row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperature-max">${Math.round(
        forecastDay.temp.max
      )}° </span> <br/>
      <span class="weather-forecast-temperature-max">${Math.round(
        forecast.temp.min
      )}° </span>
      </div>
      <div class="weatherIcon"><img
      src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png"
      alt=""
      width="42"
      />
      </div>
      </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
let form = document.querySelector(".searchCityButton");
searchButton.addEventListener("submit", handleSubmit);
search("paris");

// let Wisconsin =	"lat=44.500000&lon=-89.500000"
// let WestVirginia = "lat=39.000000&lon=-80.500000"
// let Vermont = "lat=44.000000&lon-72.699997"
// let Texas = "lat=31.000000&lon=-100.000000"
// let SouthDakota ="lat=44.500000&lon=-100.000000"
// let RhodeIsland ="lat=41.742325&lon=-71.742332"
// let Oregon = "lat=44.000000&lon=-120.500000"
// let NewYork =	"lat=43.000000&lon=-75.000000"
// let NewHampshire =	"lat=44.000000&lon=-71.500000"
// let Nebraska =	"lat=41.500000&lon=-100.000000"
// let Kansas =	"lat=38.500000&lon=-98.000000"
// let Mississippi =	"lat=33.000000&lon=-90.000000"
// let Illinois =	"lat=40.000000&lon=-89.000000"
// let Delaware = "lat=39.000000&lon=-75.500000"
// let Connecticut =	"lat=41.599998&lon=-72.699997"
// let Arkansas = "lat=34.799999&lon=-92.199997"
// let Indiana =	"lat=40.273502&lon=-86.126976"
// let Missouri =	"lat=38.573936&lon=-92.603760"
// let Florida =	"lat=27.994402&lon-81.760254"
// let Nevada =	"lat=39.876019&lon=-117.224121"
// let Maine =	"lat=45.367584&lon=-68.972168"
// let Michigan = "lat=44.182205&lon-84.506836"
// let Georgia =	"lat=33.247875&lon=-83.441162"
// let Hawaii =	"lat=19.741755&lon=-155.844437"
// let Alaska =	"lat=66.160507&lon=-153.369141"
// let Tennessee =	"lat=35.860119&lon=-86.660156"
// let Virginia =	"lat=37.926868&lon=-78.024902"
// let NewJersey =	"lat=39.833851&lon=-74.871826"
// let Kentucky =	"lat=37.839333&lon=-84.270020"
// let NorthDakota =	"lat=47.650589&lon=-100.437012"
// let Minnesota =	"lat=46.392410&lon=-94.636230"
// let Oklahoma =	"lat=36.084621&lon=-96.921387"
// let Montana =	"lat=46.965260&lon=-109.533691"
// let Washington =	"lat=47.751076&lon=-120.740135"
// let Utah =	"lat=39.419220&lon=-111.950684"
// let Colorado =	"lat=39.113014&lon=-105.358887"
// let Ohio =	"lat=40.367474&lon=-82.996216"
// let Alabama =	"lat=32.318230&lon=-86.902298"
// let Iowa =	"lat=42.032974&lon=-93.581543"
// let NewMexico =	"lat=34.307144&lon=-106.018066"
// let SouthCarolina =	"lat=33.836082&lon=-81.163727"
// let Pennsylvania =	"lat=41.203323&lon=-77.194527"
// let Arizona =	"lat=34.048927&lon=-111.093735"
// let Maryland =	"lat=39.045753&lon=-76.641273"
// let Massachusetts =	"lat=42.407211&lon=-71.382439"
// let California =	"lat=36.778259&lon=-119.417931"
// let Idaho =	"lat=44.068203&lon=-114.742043"
// let Wyoming =	"lat=43.075970&lon=-107.290283"
// let NorthCarolina =	"lat=35.782169&lon=-80.793457"
// let Louisiana =	"lat=30.391830&lon=-92.329102"
