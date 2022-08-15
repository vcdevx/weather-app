import { getWeather, currentUnit, currentLocation } from "./weather";

const searchLocation = () => {
  let searchBtn = document.querySelector(".searchBtn");

  searchBtn.addEventListener("click", () => {
    let searchBarLocation = document
      .querySelector(".searchLocation")
      .value.replace(/(\s+$|^\s+)/g, "")
      .replace(/(,\s+)/g, ",")
      .replace(/(\s+,)/g, ",")
      .replace(/\s+/g, "+");
    currentLocation = searchBarLocation;
    getWeather(currentLocation, currentUnit);
    searchBarLocation = "";
  });

  let searchLocationInput = document.querySelector(".searchLocation");

  searchLocationInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchBtn.click();
    }
  });

  const unitChangeBtn = document.querySelector(".unitChangeBtn");

  unitChangeBtn.addEventListener("click", async () => {
    let tempUnit = document.querySelectorAll(".tempUnit");

    if (currentUnit === "Imperial") {
      currentUnit = "Metric";
      await getWeather(currentLocation, currentUnit);
      for (let i = 0; i < tempUnit.length; i++) {
        tempUnit[i].textContent = "C°";
      }
      unitChangeBtn.textContent = "Change to F°";
    } else if (currentUnit === "Metric") {
      currentUnit = "Imperial";
      await getWeather(currentLocation, currentUnit);
      for (let i = 0; i < tempUnit.length; i++) {
        tempUnit[i].textContent = "F°";
      }
      unitChangeBtn.textContent = "Change to C°";
    }
  });
};

export { searchLocation };
