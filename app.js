const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "6370395d8e70e092cba97f7184323986";
  const units = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescrip = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>The weather is currently " + weatherDescrip + "</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Fahrenheit.</h1>");
      res.write("<img src=" + imageURL + ">")
      res.send();
    })
  })
})



app.listen(port, function() {
  console.log("Server is running on port " + port);
})

//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//6370395d8e70e092cba97f7184323986
