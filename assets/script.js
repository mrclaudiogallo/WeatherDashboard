//Bar that pulls Weather information
const APIKey = "0cf9dcb815959c6efe68ac898f9d080c";
let cityName = "";
let cities = [];
const savedCityStorageKey = "savedCities";
let savedCities = JSON.parse(localStorage.getItem(savedCityStorageKey)) || [];

const updateStorage = () => {
    localStorage.setItem(savedCityStorageKey, JSON.stringify(savedCities));
};

// Moment.js Code Structure
const currentDateTime = moment().format("MMM Do YYYY");
const forecast1 = moment().add(1, 'days').format("MMM Do");
const forecast2 = moment().add(2, 'days').format("MMM Do");
const forecast3 = moment().add(3, 'days').format("MMM Do");
const forecast4 = moment().add(4, 'days').format("MMM Do");
const forecast5 = moment().add(5, 'days').format("MMM Do");

$("document").ready(function () {
    $("#searchBtn").on("click", function (e) {
        e.preventDefault();
        let city = $("#cityInput").val();
        geoInfoCall(city);
    });
});

function renderCityList(cityName) {
    for (let i = 0; i < cities.length; i++) {
        let liCity = $("<li>").addClass("card-text").text(cities[i]);
        if (cities.indexOf(cityName) == -1){
            $("#cityList .card-body").append(liCity);
        }
        
        
        
    }
}

function geoInfoCall(city) {
    $("#currentWeather .card-body").empty();
    $("#oneDayForecast .card-body").empty();
    $("#twoDayForecast .card-body").empty();
    $("#threeDayForecast .card-body").empty();
    $("#fourDayForecast .card-body").empty();
    $("#fiveDayForecast .card-body").empty();


        cities.push(city);
        cityName = city;
        savedCities = cities;

        updateStorage();
        renderCityList();
    
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        let lat = response.city.coord.lat;
        let lon = response.city.coord.lon;
        let h3 = $('<h3>').addClass('card-title').text(city);        
        $("#currentWeather .card-body").append(h3);
        
    oneCall(lat,lon);
});
}

function oneCall(lat, lon) {
    let queryURL =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
    exclude=currnet&units=imperial&appid=${APIKey}`;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {

        let current = $("<p>").addClass("card-text").text(`Current Weather: ${response.current.temp}°F`);

        let currentWeather = response.current.weather[0].icon;
        let imgURL =`http://openweathermap.org/img/wn/${currentWeather}@2x.png`;
        let icon = $("<img>").attr("src", imgURL);

        let currentHumidity = $("<p>").addClass("card-text").text(`Humidity: ${response.current.humidity}`);

        let currentWind = $("<p>").addClass("card-text").text(`Wind Speed: ${response.current.wind_speed}`);

        let currentUVI = $("<p>").addClass("uvi").text(`UV Index: ${response.current.uvi}`);

        $("#currentWeather .card-body").append(currentDateTime, icon, current, currentHumidity, currentWind, currentUVI);

        //UVI
        let uvIndex = response.current.uvi;
        if (uvIndex <= 2){
            currentUVI.css("background-color", "green");
        } else if (uvIndex <= 5) {
            currentUVI.css("background-color", "yellow");
        } else if (uvIndex <=6) {
            currentUVI.css("background-color", "orange");
        } else {
            currentUVI.css("background-color", "red");
        }  

        //First Forecast


        let forecastOne = $("<h4>").addClass("card-title").text(forecast1);

        let forecastOneWeatherIcon = response.daily[0].weather[0].icon;
        let imgURLOne =`http://openweathermap.org/img/wn/${forecastOneWeatherIcon}@2x.png`;
        let iconOne = $("<img>").attr("src", imgURLOne);
        
        let forecastOneWeather = $("<p>").addClass("card-text").text(`Temp: ${response.daily[0].temp.day}°F`);

        let forecastOneHumidity = $("<p>").addClass("card-text").text(`Humidity: ${response.daily[0].humidity}`);

        $("#oneDayForecast .card-body").append(forecastOne, iconOne, forecastOneWeather, forecastOneHumidity);

        //Second Forecast

        let forecastTwo = $("<h4>").addClass("card-title").text(forecast2);

        let forecastTwoWeatherIcon = response.daily[1].weather[0].icon;
        let imgURLTwo =`http://openweathermap.org/img/wn/${forecastTwoWeatherIcon}@2x.png`;
        let iconTwo = $("<img>").attr("src", imgURLTwo);
        
        let forecastTwoWeather = $("<p>").addClass("card-text").text(`Temp: ${response.daily[1].temp.day}°F`);

        let forecastTwoHumidity = $("<p>").addClass("card-text").text(`Humidity: ${response.daily[1].humidity}`);

        $("#twoDayForecast .card-body").append(forecastTwo, iconTwo, forecastTwoWeather, forecastTwoHumidity);

        //Third Forecast

        let forecastThree = $("<h4>").addClass("card-title").text(forecast3);

        let forecastThreeWeatherIcon = response.daily[2].weather[0].icon;
        let imgURLThree =`http://openweathermap.org/img/wn/${forecastThreeWeatherIcon}@2x.png`;
        let iconThree = $("<img>").attr("src", imgURLThree);
        
        let forecastThreeWeather = $("<p>").addClass("card-text").text(`Temp: ${response.daily[2].temp.day}°F`);

        let forecastThreeHumidity = $("<p>").addClass("card-text").text(`Humidity: ${response.daily[2].humidity}`);

        $("#threeDayForecast .card-body").append(forecastThree, iconThree, forecastThreeWeather, forecastThreeHumidity);

        //Fourth Forecast

        let forecastFour = $("<h4>").addClass("card-title").text(forecast4);

        let forecastFourWeatherIcon = response.daily[3].weather[0].icon;
        let imgURLFour =`http://openweathermap.org/img/wn/${forecastFourWeatherIcon}@2x.png`;
        let iconFour = $("<img>").attr("src", imgURLFour);
        
        let forecastFourWeather = $("<p>").addClass("card-text").text(`Temp: ${response.daily[3].temp.day}°F`);

        let forecastFourHumidity = $("<p>").addClass("card-text").text(`Humidity: ${response.daily[3].humidity}`);

        $("#fourDayForecast .card-body").append(forecastFour, iconFour, forecastFourWeather, forecastFourHumidity);

        //Fifth Forecast

        let forecastFive = $("<h4>").addClass("card-title").text(forecast5);

        let forecastFiveWeatherIcon = response.daily[4].weather[0].icon;
        let imgURLFive =`http://openweathermap.org/img/wn/${forecastFiveWeatherIcon}@2x.png`;
        let iconFive = $("<img>").attr("src", imgURLFive);
        
        let forecastFiveWeather = $("<p>").addClass("card-text").text(`Temp: ${response.daily[4].temp.day}°F`);

        let forecastFiveHumidity = $("<p>").addClass("card-text").text(`Humidity: ${response.daily[4].humidity}`);

        $("#fiveDayForecast .card-body").append(forecastFive, iconFive, forecastFiveWeather, forecastFiveHumidity);

    });
    
}