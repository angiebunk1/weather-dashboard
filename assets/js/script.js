var apiKey = "2dec3d0eee211f2e9659dcccac2ff8f5";

var searchBtnEl = document.querySelector("#search-button");
var cityInputEl = document.querySelector("#city-input");

var historyEl = document.querySelector("#search-history");

var searchHistory = [];

var city = "";






var searchCity = function(city) {
    

 var cityNameEl = document.getElementById("city-name")
    cityNameEl.textContent = city



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

   

    // var searchedCityEl = document.getElementById("search-history")
    // searchedCityEl.textContent = city

    

    
        
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

    fiveDayForecast(cityData);
                        
};

var fiveDayForecast = function(cityData) {
    console.log(cityData);

    for (var i=1; i < 6; i++) {        

        var forecastDateEl = document.getElementById("date" + i)
        forecastDateEl.textContent = moment(cityData.daily[i].dt *1000).format("MMM DD")

        var forecastIconEl = document.getElementById("icon" + i)
        forecastIconEl.setAttribute("src", "http://openweathermap.org/img/w/" + cityData.daily[i].weather[0].icon + ".png")

        var forecastTempEl = document.getElementById("temp" + i)
        forecastTempEl.textContent = "Temp: " + cityData.daily[i].temp.day

        var forecastWindEl = document.getElementById("wind" + i)
        forecastWindEl.textContent = "Wind Speed: " + cityData.daily[i].wind_speed

        var forecastHumEl = document.getElementById("hum" + i)
        forecastHumEl.textContent = "Humidity: " + cityData.daily[i].humidity                             
        
        

    }

};






// city search button event listener
searchBtnEl.addEventListener("click", function() {
// prevent page from reloading
// preventDefault();

// get value from city search input

var city = cityInputEl.value.trim();

searchCity(city);

searchHistory.push(city);

localStorage.setItem("search", JSON.stringify(searchHistory));

renderSearchHistory();


});

var renderSearchHistory = function() {
    historyEl.innerHTML = "";
    for (var i=0; i < searchHistory.length; i++) {
        var historyBtn = document.createElement("button");
        historyBtn.setAttribute("type", "button");
        historyBtn.textContent = searchHistory[i];
        historyBtn.setAttribute("class", "bg-white mb-2");
        historyEl.appendChild(historyBtn);
    }


}