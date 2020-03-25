const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){
 res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

    const query = req.body.cityName;

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=32d6b718b1e2b9ffacbbf6ac27a49b40&units=metric";

    https.get(url, function(response){
      console.log(res.statusCode);

      response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
        console.log(weatherData);
        res.write("<p>With " + weatherDescription + " ,</p>");
        res.write("<h1>the temperature in " + query + " is " + temp + " degrees Celcius</h1>");
        res.write("<img src=" + imageURL + ">");
        res.send();
      });
    });



});



app.listen(3000, function (){
  console.log("Server running on port 3000");
});
