fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    const countryContainer = document.getElementById("countryContainer");
    const cardTemplate = document.getElementById("cardTemplate");
    data.forEach((country) => {
      const card = cardTemplate.content.cloneNode(true).firstElementChild;

      card.querySelector(".card-header").textContent = country.name.common;
      card.querySelector(".card-img-top").src = country.flags.svg;
      card.querySelector(".card-text p:nth-child(1)").textContent +=
        "  " + country.capital;
      card.querySelector(".card-text p:nth-child(2)").textContent +=
        "  " + country.region;
      card.querySelector(".card-text p:nth-child(3)").textContent +=
        "  " + country.name.common;
      card.querySelector(".card-text p:nth-child(4)").textContent +=
        "  " + country.population;

      card.querySelector(".btn").addEventListener("click", () => {
        fetchWeather(country.capital);
      });
      countryContainer.appendChild(card);
    });
  })
  .catch((error) => console.log(error));

// function fetchWeather(city, latlng){
//     const apiKey = "d7ad63899fc0a59781da13cc9ce3f878";
//     const [lat, lng] = latlng;

//     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`;

//     fetch(apiUrl).then(response => response.json())
//     .then(data => {
//         alert(`Weather in ${city}: ${data.weather[0].description}`);
//     }).catch(error => console.log(error));
// }

function fetchWeather(city) {
  const apiKey = "bb1b63b6b6df5976c837f98c04f66828";
  // const [lat, lng] = latlng;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.weather && data.weather.length > 0) {
        const description = data.weather[0].description;
        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        alert(
          `Current weather in \n${city}: ${description},\nTemperature: ${temperature}°C,\nHumidity: ${humidity}%`
        );
      } else {
        alert(`Weather information not available for ${city}`);
      }
    })
    .catch((error) => alert(error));
}
