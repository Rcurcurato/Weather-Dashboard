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

var inputEl = document.querySelector('#city-input');
var apiKey = "cf0dfaf24db5645db03554152b5673ad";
var weatherCardEl = document.getElementById('weather-card');
var cityList = document.getElementById("history");
var cities = [];

//saves searched cities to local storage and retrieves data to display
//it to saved city list on page
function renderCities() {
    cityList.innerHTML = "";

    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];

        var li = document.createElement("li");
        li.textContent = city;
        li.setAttribute("data-index", i);

        cityList.appendChild(li);
    }

}

function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
}

var storedCities = JSON.parse(localStorage.getItem("cities"));
if (storedCities !== null) {
    cities = storedCities;
    renderCities();
}


// Function to clear the search history from local storage and the displayed list
function clearSearchHistory() {
    cityList.innerHTML = "";
}
//add event listener for clear button
document.getElementById("clear-btn").addEventListener("click", function () {

    //clear search history
    localStorage.clear()

    clearSearchHistory();

    //Clear text on webpage
    document.getElementById("weather-card").innerHTML = "";
    document.getElementById("forecast-card").innerHTML = "";

    if (cities.length > 0) {
        var lastSearchedCity = cities[cities.length - 1];
        fetchForecastData(lastSearchedCity);
    }
});

//function to fetch weather data from api and display it to page when user searches for a city
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
            iconEl.innerHTML = `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">`;

            currentCityEl.textContent = data.name;
            iconEl.textContent = "Weather Icon: " + data.weather[0].icon;
            temperatureEl.textContent = "Temperature: " + data.main.temp + " K";
            windEl.textContent = "Wind Speed: " + data.wind.speed + " m/s";
            humidityEl.textContent = "Humidity: " + data.main.humidity + "%";
        })
        .catch(function (error) {
            console.log("Error fetching weather data:", error);
            alert("Error fetching weather data. Please try again later.");
        });

    //function to fetch future 5 day weather forecast and display it into 5 seperate boxes when user searches for a city
} function fetchForecastData(cityName) {

    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

    fetch(forecastUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);


            if (data.cod && data.cod !== 200) {
                alert("City not found. Please enter a valid city name.");
                return;
            }

            var columns = document.querySelectorAll(".column");
            for (let i = 0; i < 5; i++) {
                var forecastDate = new Date(data.list[i].dt_txt);
                var forecastIcon = data.list[i].weather[0].icon;
                var forecastTemp = data.list[i].main.temp;
                var forecastWind = data.list[i].wind.speed;
                var forecastHumidity = data.list[i].main.humidity;

                var columnEl = columns[i];
                var forecastContent = `
                <h4>${forecastDate.toLocaleDateString()}</h4>
                    <div>Weather Icon: <img src="https://openweathermap.org/img/w/${forecastIcon}.png" alt="Weather Icon"></div>
                    <div>Temperature: ${forecastTemp} K</div>
                    <div>Wind Speed: ${forecastWind} m/s</div>
                    <div>Humidity: ${forecastHumidity}%</div>
                    `;
                columnEl.innerHTML += forecastContent;

            }
        })
        .catch(function (error) {
            console.log("error fetching forecast data:", error);
            alert("error fetching forecast data. Please try again later.")

        })
}

document.getElementById('search-btn').addEventListener('click', function () {
    var cityName = inputEl.value;
    fetchWeatherData(cityName);
    fetchForecastData(cityName);
    cities.push(cityName);
    storeCities();
    renderCities();
});
