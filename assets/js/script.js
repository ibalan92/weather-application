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
            var weatherData = data.list;
            forecast(weatherData);
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
var forecastEl = document.getElementById("forecast");
function setForecastTitle(){
    forecastTitle.textContent = "5-Day Forecast:";
    forecastTitle.setAttribute("class", "fw-bold p-2")
    forecastEl.appendChild(forecastTitle);
}

var todayDay = parseInt(todayDate = dayjs().format("DD"));
function forecast(element){
        for(j=0;j<element.length;j++){
            var cardTitle = document.createElement("h2");
        var cardInfo = document.createElement("ul");
        var cardTemp = document.createElement("li");
        var cardWind = document.createElement("li");
        var cardHumidity = document.createElement("li");
        var cardIcon = document.createElement("img");
            var forecastDay = parseInt((element[j].dt_txt).slice(8,10));

            if(todayDay !== forecastDay){
                var iconURL = "http://openweathermap.org/img/w/" + element[j].weather[0].icon + ".png"
                cardTitle.textContent = (element[j].dt_txt).slice(8,10) + "/" + (element[j].dt_txt).slice(5, 7) + "/" + (element[j].dt_txt).slice(0, 4);
                cardTitle.setAttribute("class", "p-1 fs-4")
                var celsius = Math.round(element[j].main.temp - 273.15);
                cardTemp.textContent = "Temp: " + celsius + " °C";
                cardWind.textContent = "Wind: " + element[j].wind.speed + " KPH";
                cardHumidity.textContent = "Humidity: " + element[j].main.humidity + "%";
                cardInfo.setAttribute("class", "col list-unstyled me-2 d-grid gap-3 border border-dark");
                cardIcon.setAttribute("src", iconURL);
                cardInfo.appendChild(cardTitle);
                cardInfo.appendChild(cardIcon);
                cardInfo.appendChild(cardTemp);
                cardInfo.appendChild(cardWind);
                cardInfo.appendChild(cardHumidity);
                forecastEl.appendChild(cardInfo);
                forecastEl.setAttribute("class","row mt-3");
                todayDay =forecastDay;
            }
        }
    }