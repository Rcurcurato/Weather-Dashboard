//psuedo code:
//Set up UI with necessary from inputs and sections 
//to display current and futures weather conditions.

//Implement the functionality to handle city search. 

//Integrate the API to retrieve the future weather forecase
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

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + torrington + "&appid=" + 71d1bf2fb629e5895f40848fc4911d1b;

fetch(queryURL)