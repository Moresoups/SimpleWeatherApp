//key = "e399156459a95a7ca0de1a333acc798d"

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

//var APIKey = "0b276ca072mshebd5f85a364591cp19a269jsn385a7112a304";

var citySearchName = document.getElementById("searchValue");
var searchButton = document.getElementById("search-button");
moment().format("L");

var APIKey = "166a433c57516f51dfab1f7edaed8413";
var lat = "";
var lon = "";

var citySearchArray = localStorage.citySearchArray
  ? JSON.parse(localStorage.citySearchArray)
  : [];

function showCityButtons() {
  document.querySelector("#cityArray").innerHTML = "";
  for (i = 0; i < citySearchArray.length; i++)
    document.querySelector("#cityArray").innerHTML += `
	<li onclick="weatherResults('${citySearchArray[i]}')"class="btn btn-secondary mb-1">${citySearchArray[i]}</li>`;
}

showCityButtons();

searchButton.addEventListener("click", searchButtonClick);
function searchButtonClick(event) {
  let city = citySearchName.value;
  console.log(city);
  citySearchArray.push(city);
  localStorage.citySearchArray = JSON.stringify(citySearchArray);
  showCityButtons();
  weatherResults(city);
  console.log(city);
}

function weatherResults(name) {
  var queryURL =
    `https://api.openweathermap.org/data/2.5/weather?q=` +
    name +
    `&units=metric&appid=` +
    APIKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(`response is: `, response);
    apiData = response;
    document.querySelector("#cityNameJumboDisplay").textContent =
      apiData.name + " " + moment().format("L");
    document.querySelector(
      "#currentJumboTemp"
    ).innerHTML = `Temperature : ${apiData.main.temp} &#186 C`;
    document.querySelector(
      "#jumboHumidity"
    ).innerHTML = `Humidity : ${apiData.main.humidity} %`;
    document.querySelector(
      "#jumboWindSpeed"
    ).textContent = `Wind Speed : ${apiData.wind.speed} MPH`;
    document.querySelector(
      "#icon"
    ).innerHTML = `<img class="ml-5" src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png"/>`;

    lat = apiData.coord.lat;
    lon = apiData.coord.lon;
    var DailyURL =
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=` +
      APIKey;

    $.ajax({
      url: DailyURL,
      method: "GET",
    }).then(function (response) {
      document.querySelector(
        "#temp1"
      ).innerHTML = `Temp: ${response.daily[1].temp.day} \xB0C`;
      document.querySelector(
        ".img1"
      ).innerHTML = `<img src="https://openweathermap.org/img/wn/${response.daily[1].weather[0].icon}@2x.png"/>`;
      document.querySelector(
        "#humid1"
      ).innerHTML = `Temp: ${response.daily[1].humidity}%`;
      console.log(response);

      document.querySelector(
        "#temp2"
      ).innerHTML = `Temp: ${response.daily[2].temp.day} \xB0C`;
      document.querySelector(
        ".img2"
      ).innerHTML = `<img src="https://openweathermap.org/img/wn/${response.daily[2].weather[0].icon}@2x.png"/>`;
      document.querySelector(
        "#humid2"
      ).innerHTML = `Temp: ${response.daily[2].humidity}%`;
      console.log(response);

      document.querySelector(
        "#temp3"
      ).innerHTML = `Temp: ${response.daily[3].temp.day} \xB0C`;
      document.querySelector(
        ".img3"
      ).innerHTML = `<img src="https://openweathermap.org/img/wn/${response.daily[3].weather[0].icon}@2x.png"/>`;
      document.querySelector(
        "#humid3"
      ).innerHTML = `Temp: ${response.daily[3].humidity}%`;
      console.log(response);

      document.querySelector(
        "#temp4"
      ).innerHTML = `Temp: ${response.daily[4].temp.day} \xB0C`;
      document.querySelector(
        ".img4"
      ).innerHTML = `<img src="https://openweathermap.org/img/wn/${response.daily[4].weather[0].icon}@2x.png"/>`;
      document.querySelector(
        "#humid4"
      ).innerHTML = `Temp: ${response.daily[4].humidity}%`;
      console.log(response);

      document.querySelector(
        "#temp5"
      ).innerHTML = `Temp: ${response.daily[5].temp.day} \xB0C`;
      document.querySelector(
        ".img5"
      ).innerHTML = `<img src="https://openweathermap.org/img/wn/${response.daily[5].weather[0].icon}@2x.png"/>`;
      document.querySelector(
        "#humid5"
      ).innerHTML = `Temp: ${response.daily[5].humidity}%`;
      console.log(response);
    });

    var UvURL =
      `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=` +
      APIKey;

    $.ajax({
      url: UvURL,
      method: "GET",
    }).then(function (response) {
      $("#uvNum").text(`${response.value}`);
      console.log(response.value);

      if (response.value < 2) {
        $("#uvNum").attr("class", "btn btn-success");
      } else if (response.value >= 2 && response.value <= 5) {
        $("#uvNum").attr("class", "btn btn-warning");
      } else if (response.value > 5 && response.value <= 7) {
        $("#uvNum").attr("class", "btn btn-orange");
      } else if (response.value >= 8 && response.value <= 10) {
        $("#uvNum").attr("class", "btn btn-danger");
      }
    });
  });
}
