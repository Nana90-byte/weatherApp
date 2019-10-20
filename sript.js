var API = "f70e851e16a8be7c1ef3a95b2e6e7239";
var queryURL = "api.openweathermap.org/data/2.5/weather?q=London" + API;
var test = "mira";
console.log(test);


$.ajax({
    url: queryURL,
    method: "GET"
    
  })
   console.log(queryURL);