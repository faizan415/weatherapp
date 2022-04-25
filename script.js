let weather = {
  apiKey: "314b218598d43a5dfdbb57c91fa403ee",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temperature").innerText = Math.floor(temp) + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + Math.floor(humidity) + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + Math.floor(speed) + " km/h";
    document.querySelector(".weather").classList.remove("default");

},

  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  }
}

document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1561484930-998b6a7b22e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')";


document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
 
weather.fetchWeather("Toronto");
