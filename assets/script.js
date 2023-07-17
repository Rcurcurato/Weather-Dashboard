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


var apiKey = "71d1bf2fb629e5895f40848fc4911d1b"
var city;
var queryURL;
var searchButtonEl = getElementById("search-btn")
var cityInputEl = getElementById("city-input")
var citiesList = getElementById("cities")
var searchHistoryEl = getElementById("search-history")
var historyEl = getElementById("history")
var currentWeatherEl = getElementById("current-weather")
var futureWeatherEl = getElementById("five-day-forecast")

queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

//add event listener to search button 
searchButtonEl.addEventListener("click", searchCity);
//
function searchCity () {
    var city = cityInputEl.value.trim();

    if (city = city !== '') {
        var apiKey = "71d1bf2fb629e5895f40848fc4911d1b";
        var queryURL =  "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
         
        fetch(queryURL)
        .then(response => response.json())
        .then(data => {

            displayCurrentWeather(data.currentWeatherEl);

            var futureWeather = data.futureWeatherEl;

            addToSearchHistory(city);
        })
    
        .catch(error => {
            console.error("Error fetching weather data", error);
        });
    }
}