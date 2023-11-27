var searchBtn = document.getElementById("search-button")
var city = document.getElementById("search-input")
var APIkey ="b7c8404eb7ec2db5624c4a872e9ce2d3"

searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    citySearched = city.value;
    console.log(city.value)
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
        });
    });

});



