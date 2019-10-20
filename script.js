// //Initial Arrays of cities
var cities = [""];


function renderButtons() {

    // Deleting the buttons prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    //Deletes the text in the search input when the search button is clicked
    $("#city-input").val("");

    // Looping through the array of movies
    for (var i = 0; i < cities.length; i++) {

        // Then dynamicaly generating buttons for each city in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of city to our button
        a.addClass("city");
        // Adding a data-attribute
        a.attr("data-name", cities[i]);
        // Providing the initial button text
        a.text(cities[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }

    $(".city").on("click", function (event) {
        console.log(this);
        event.preventDefault();
        // test(nameOfCity)
        test($(this).attr("data-name"))

    })
}

// This function handles events where one button is clicked
$("#bttn").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var city = $("#city-input").val().trim();
    // The city from the textbox is then added to our array
    cities.push(city);
    guardar();
    test(city);
    renderButtons();
});

//makes all the ajax calls
function test(city) {
    var API = "166a433c57516f51dfab1f7edaed8413";
    console.log("#city-input")
  
    var lat = "";
    var lon = "";
    var queryURL2 = "";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API;
    var newCityId = "";
    var queryURL3 = "";

    //first ajax call function for the daily wheather
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var sqr = $(".square");
        var nombre = $(".name").html("<h1>" + response.name + " Weather Details</h1>" + ( moment().format("dddd MMMM Do")) );
        var tmp = $(".temp").text("Temperature (F) " + response.main.temp);
        var humedad = $(".humidity").text("Humidity: " + response.main.humidity);
        var viento = $(".wind").text("Wind Speed: " + response.wind.speed);
        var uvSpot = $(".uv");
        newCityId = response.id;
        sqr.append(nombre, tmp, humedad, viento, uvSpot)
        lat = response.coord.lat;
        lon = response.coord.lon;
        queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=" + API + "&lat=" + lat + "&lon=" + lon;

    }).then(function () {
        //second ajax call function for the uv index
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response) {
            var uv1 = response.value;
            $(".uv").text("UV Index: " + "");
            $(".uv").append(uv1);
            queryURL3 = "http://api.openweathermap.org/data/2.5/forecast?appid=" + API + "&id=" + newCityId + "&units=imperial";
        }).then(function () {
            //third ajax call function for the 5-day broadcast
            $.ajax({
                url: queryURL3,
                method: "GET",
            }).then(function (response) {
                console.log(response);
                var date1 = $("#box1").html(moment().add(1, "day").format("MM Do YYYY") + "<br/> Temperature:" + response.list["5"].main.temp + "<br/> Humidity:" + response.list["5"].main.humidity);
                $("#box1").append(date1);
                var date2 = $("#box2").html(moment().add(2, "days").format("MM Do YYYY") + "<br/> Temperature:" + response.list["13"].main.temp + "<br/> Humidity:" + response.list["13"].main.humidity);
                $("#box2").append(date2);
                var date3 = $("#box3").html(moment().add(3, "days").format("MM Do YYYY") + "<br/> Temperature:" + response.list["21"].main.temp + "<br/> Humidity:" + response.list["21"].main.humidity);
                $("#box3").append(date3);
                var date4 = $("#box4").html(moment().add(4, "days").format("MM Do YYYY") + "<br/> Temperature:" + response.list["29"].main.temp + "<br/> Humidity:" + response.list["29"].main.humidity);
                $("#box4").append(date4);
                var date5 = $("#box5").html(moment().add(5, "days").format("MM Do YYYY") + "<br/> Temperature:" + response.list["37"].main.temp + "<br/> Humidity:" + response.list["37"].main.humidity);
                $("#box5").append(date5);

            })
        })
    })
   

}
//a maximum of ten cities will be stored on local storage
var storage = ["one", "two", "three", "four", "five", "six"];
var index = 0;
var guardar = function () {
    if (index < 6) {
        localStorage["city" + storage[index]] = $("#city-input").val();
        index++;
    } else {
        index = 0;
        localStorage["city" + storage[index]] = $("#city-input").val();
        index++;

    }
}