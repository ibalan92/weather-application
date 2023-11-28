var searchBtn = document.getElementById("search-button")
var city = document.getElementById("search-input")
var APIkey ="b7c8404eb7ec2db5624c4a872e9ce2d3"
var historyEl = document.getElementById("history")
var historyList = [];


searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    citySearched = city.value;
    if(citySearched !== ""){
    console.log(city.value);
    checkHistory(citySearched);
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q="+ citySearched + "&limit=5&appid=" + APIkey
            
    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var lat = data[0].lat;
        var lon = data[0].lon;

        console.log(data);

        searchURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+ lat + "&lon=" + lon +"&appid=" + APIkey;
        fetch(searchURL)
        .then(function (response) {
            return response.json();

        })
        .then(function(data) {
            console.log(data)
            today(data);
            setForecastTitle();
            console.log(data.list[0].weather[0].icon)
        });
    });
    }

});

function checkHistory(exists){
    if( historyList.includes(exists) === false){
        historyList.push(exists);
        console.log(historyList);
        var button = document.createElement("button");
        button.setAttribute("class", "btn btn-secondary text-dark p-2")
        button.textContent = exists;
        historyEl.appendChild(button);
    }
    
}
var todayEl = document.createElement("h2");
var weatherInfo = document.createElement("ul");
var temp = document.createElement("li");
var wind = document.createElement("li");
var humidity = document.createElement("li");
var icon = document.createElement("img");
function today(element){
    var todayBox = document.getElementById("today");
    var iconURL = "http://openweathermap.org/img/w/" + element.list[0].weather[0].icon + ".png"
    todayDate = dayjs().format("DD/M/YYYY");
    todayEl.textContent = element.city.name + " " + todayDate + " ";
    todayEl.setAttribute("class", "p-2")
    var celsius = Math.round(element.list[0].main.temp - 273.15);
    temp.textContent = "Temp: " + celsius + " °C";
    wind.textContent = "Wind: " + element.list[0].wind.speed + " KPH";
    humidity.textContent = "Humidity: " + element.list[0].main.humidity + "%";
    weatherInfo.setAttribute("class", "list-unstyled p-2 d-grid gap-3");
    icon.setAttribute("src", iconURL);
    todayEl.appendChild(icon);
    weatherInfo.appendChild(temp);
    weatherInfo.appendChild(wind);
    weatherInfo.appendChild(humidity);
    todayBox.appendChild(todayEl);
    todayBox.appendChild(weatherInfo);
    todayBox.setAttribute("class","border border-dark mt-3")
}

var forecastTitle = document.createElement("h4");
function setForecastTitle(){
    forecastTitle.textContent = "5-Day Forecast:";
    forecastTitle.setAttribute("class", "fw-bold p-2")
    var forecastEl = document.getElementById("forecast");
    forecastEl.appendChild(forecastTitle);
}
