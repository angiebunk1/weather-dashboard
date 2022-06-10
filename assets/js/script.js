var apiKey = "2dec3d0eee211f2e9659dcccac2ff8f5";

var searchBtnEl = document.querySelector("#search-button");
var cityInputEl = document.querySelector("#city-input");

var city = "";






var searchCity = function(event) {
    // prevent page from reloading
    event.preventDefault();

    // get value from city search input
    
var city = cityInputEl.value.trim();

    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(data);
                    var lat = data[0].lat
                    var lon = data[0].lon
                    getWeather(lat, lon);
                });
            } else {
                alert("Error: Cannot find weather for that city. Try again.")
            }
        })
        .catch(function(error) {
            alert("Unable to connect to weather service.");
        });

    var cityNameEl = document.getElementById("city-name")
    cityNameEl.textContent = city
    
        
};

var getWeather = function(lat, lon) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(data);
                    displayCurrentWeather(data);
                });
            } else {
                alert("Error: Cannot find weather for that city. Try again.")
            }
        })
        .catch(function(error) {
            alert("Unable to connect to weather service.");
        });

};

var displayCurrentWeather = function(cityData) {
    console.log(cityData);
    

    var dateEl = document.getElementById("date")
    dateEl.textContent = moment(cityData.current.dt *1000).format("MMM DD YYYY")

    var weatherIconEl = document.getElementById("icon")
    weatherIconEl.setAttribute("src", "http://openweathermap.org/img/w/" + cityData.current.weather[0].icon + ".png")

    var tempEl = document.getElementById("temp")
    tempEl.textContent = "Temp: " + cityData.current.temp 

    var humEl = document.getElementById("hum")
    humEl.textContent = "Humidity: " + cityData.current.humidity

    var windEl = document.getElementById("wind")
    windEl.textContent = "Wind Speed: " + cityData.current.wind_speed

    var uvEl = document.getElementById("uv")
    uvEl.textContent = "UV Index: " + cityData.current.uvi
};






// city search button event listener
searchBtnEl.addEventListener("click", searchCity);