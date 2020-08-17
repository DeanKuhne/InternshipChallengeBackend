const express = require('express')
const request = require('request')

const app = express()
var privateKey = '********************************';

app.get('*', function (req, res) {
    var lati = req.query.latitude;
    var long = req.query.longitude;

    var formedURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&units=imperial&appid=${privateKey}`;

    request(formedURL, function (error, response, body) {
        jsonResponse = JSON.parse(body);
        var weatherObject = {
            location: jsonResponse.name,
            country: jsonResponse.sys.country,
            actualTemperature: jsonResponse.main.temp,
            percievedTemperature: jsonResponse.main.feels_like,
            forecast: jsonResponse.weather[0].description
        };

        res.send(weatherObject);

    });
});

app.listen(3000, function () {
    console.log("Express server acting out of port 3000");
})