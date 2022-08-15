import { displayWeather } from "./DOM";

let currentUnit = "Imperial";
let currentLocation = "Atlanta";

async function getWeather(city, unit) {
  try {
    let cityURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&APPID=ee0aeaa0dce59884697aa98bf4f516ae`;
    let response = await fetch(cityURL, { mode: "cors" });
    let weatherData = await response.json();

    console.log(response);

    let locationName = document.querySelector(".locationName");
    let weatherDescription = document.querySelector(".weatherDescription");
    let currentTemp = document.querySelector(".currentTemp");
    let feelsLike = document.querySelector(".feelsLike");
    let hiTemp = document.querySelector(".hiTemp");
    let loTemp = document.querySelector(".loTemp");
    let weatherIcon = document.querySelector(".weatherIcon");
    let tempUnit = document.querySelectorAll(".tempUnit");

    locationName.textContent = weatherData.name;
    currentLocation = weatherData.name;
    if (currentLocation.length > 9) {
      locationName.style.fontSize = "3.8rem";
    }
    weatherDescription.textContent = weatherData.weather[0].description;
    currentTemp.textContent = `${parseInt(weatherData.main.temp)}`;
    feelsLike.textContent = `Feels like: ${parseInt(
      weatherData.main.feels_like
    )}`;
    hiTemp.textContent = `Hi: ${parseInt(weatherData.main.temp_max)}`;
    loTemp.textContent = `Lo: ${parseInt(weatherData.main.temp_min)}`;
    weatherIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`
    );

    if (currentUnit === "Imperial") {
      tempUnit.textContent = "F°";
    } else if (currentUnit === "Metric") {
      tempUnit.textContent = "C°";
    }
  } catch (error) {
    console.log(error.message);
    let errorMsg = document.querySelector(".errorMsg");
    errorMsg.textContent = "Please enter a valid CITY";
    setTimeout(function () {
      errorMsg.textContent = "";
    }, 3000);
  }
}

export { getWeather, currentUnit, currentLocation };
