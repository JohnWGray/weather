
// Function to get weather data, it still needs to be called below using the parameters. 
function getWeather(cityID) {
    // set 'key' to unique api key

    var key = 'd273bb3ae5daaea83894281c8ce84812';
    /*Using fetch with specific format given by openweathermap depending on search criteria.
    'cityID' and 'key' are parmeters that are inserted down below.*/

    // The fetch() method returns a Promise so you can use the then() and catch() methods.
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + key)

        // The 'resp' could be named anything, but is a 'Response' object regardless. 
        /* Once we got the data, log it, (Because I want to see it)
        also call the 'drawWeather' function using the 'data' as the parameter. 
        */
        .then(function (resp) { return resp.json() }) // Convert data to json
        .then(function (data) {
            console.log(data);
            drawWeather(data)
        })

        .catch(function () {
            // catch any errors
        });
}

// Create the drawWeather() function with 1 perameter which is 'd'

/* Since OWM temp is in celcius, we make a farahenheit var and 
set it to it, and the parameter(d in this case), then access the 'main' section, 
from 'main' we want 'temp'. Then we do some fancy math to it. 

The 'parse' part simply converts the info into a string, if it can.

Then the wind speed is converted from meters-per-sec to mph by multipying it by 2.237.
*/
function drawWeather(d) {
    var fahrenheit = Math.round(((parseFloat(d.main.temp) - 273.15) * 1.8) + 32);
    var mph = Math.round(((parseFloat(d.wind.speed) * 2.237)));

    /* Display the appropriate weather icon based on whatever the d.weather[0].icon is.
    1. Makes a temp var called icon and inside it:
    2. An image with the src to the set openweather icon section. 
    3. Then, the icon code that our current data is pointing to.
    4. Then add the .png extension to complete the image, regardless of whatever it is. 
    5. Lastly, put the var icon in the 'visual' div section.
    */
    var icon = ("<img src='http://openweathermap.org/img/w/" + d.weather[0].icon + ".png'>");
    $('#visual').html(icon);

    /* in the 'description' we insert stuff from d similar to above.
    from d, then weather, then 0 (using [0], finally description from the 0 section*/
    $('#description').html(d.weather[0].description);

    /*  insert the 'farenheit' variable here, then add the degree symbol next to it.*/
    $('#temp').html(fahrenheit + '&deg;');

    /*  from 'd', then 'name', we insert it into 'location */
    $('#location').html(d.name);

    /*  from 'd', then 'humidity', we insert it into 'humidity' (named the same) */
    $('#humidity').html(d.main.humidity + '%');

    /*  insert the 'mph' variable here, then add the mph text next to it.*/
    $('#windspeed').html(mph + ' mph');

}

//When the page loads, run getWeather with the city id in the parameters. 
window.onload = function () {
    getWeather(4394870);
}
