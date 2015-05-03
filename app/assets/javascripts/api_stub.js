/**
 * Created by kaceyryan on 5/2/15.
 */


function get_images(){
    if (navigator.geolocation) {
        var query = navigator.geolocation.getCurrentPosition(getPosition, showError);
    } else {
        //Handle error
        //x.innerHTML = "Geolocation is not supported by this browser.";
    }

    var request = require('request');
    var json_images = request(query, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            return body; // Show the HTML for the Google homepage.
        }
    });

    var json_obj = JSON.parse(json_images);
    return json_obj;
}

function getPosition(postion){
    return str.concat("http://thesnapyak.com/images?lat=", position.coords.latitude, "&long=", postion.coords.longitude);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            //x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            //x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            //x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            //x.innerHTML = "An unknown error occurred."
            break;
    }
}