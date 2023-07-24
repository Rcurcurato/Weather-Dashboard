//psuedo code:
//Set up UI with necessary from inputs and sections 
//to display current and futures weather conditions.

//Implement the functionality to handle city search. 

//Integrate the API to retrieve the future weather forecast
//for the next 5 days. Parse the response data and display
//the forecasted information including date, weather icon,
//temperature, wind speed, and humidity, in the appropriate 
//section.

//Implement the search history feature. When a user searches
//for a city, add that city to the search history with local
//storage or server side database.

//Handle the click event for the cities in the search history.

// var inputEl = document.querySelector('#city-input');
// var apiKey = "71d1bf2fb629e5895f40848fc4911d1b";
// var cardEl = document.getElementById('card');

// // Assuming you have the latitude and longitude values available in the variables lat and lon
// var lat = 40.7128; // Replace with the actual latitude of the desired location
// var lon = -74.0060; // Replace with the actual longitude of the desired location

// var queryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

// fetch(queryUrl)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//         // Handle the weather data here, e.g., update the card element with relevant information
//     });


// JavaScript code starts here
var inputEl = document.querySelector('#city-input');
var apiKey = "71d1bf2fb629e5895f40848fc4911d1b"; // Replace "YOUR_API_KEY" with your actual OpenWeatherMap API key
var weatherCardEl = document.getElementById('weather-card');

function fetchWeatherData(cityName) {
    var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // Check if the API returned an error
            if (data.cod && data.cod !== 200) {
                alert("City not found. Please enter a valid city name.");
                return;
            }

            // Update the weather card with relevant information
            var currentCityEl = document.getElementById("current-city");
            var iconEl = document.getElementById("icon");
            var temperatureEl = document.getElementById("temperature");
            var windEl = document.getElementById("wind");
            var humidityEl = document.getElementById("humidity");

            currentCityEl.textContent = data.name;
            iconEl.textContent = "Weather Icon: " + data.weather[0].icon; // You might want to display an actual icon image instead of the icon code
            temperatureEl.textContent = "Temperature: " + data.main.temp + " K";
            windEl.textContent = "Wind Speed: " + data.wind.speed + " m/s";
            humidityEl.textContent = "Humidity: " + data.main.humidity + "%";
        })
        .catch(function (error) {
            console.log("Error fetching weather data:", error);
            alert("Error fetching weather data. Please try again later.");
        });
}

document.getElementById('search-btn').addEventListener('click', function () {
    var cityName = inputEl.value;
    fetchWeatherData(cityName);
});

