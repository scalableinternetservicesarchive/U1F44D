/**
 * Created by kaceyryan on 5/2/15.
 */

var request = require('request');

class API {
  //get images in JSON object for your location
  getImages(callback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var query = "/images?lat=".concat(position.coords.latitude, "&long=", position.coords.longitude);
        //var query = "http://localhost:3000/images?lat=34.0722&long=118.4441";
        request(query, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            callback(JSON.parse(body));
          }
        });
      }, this.showError);
    } else {
      //Handle error
      //x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  //post an image for your provided location
  //Does this need a callback?
  postImage(image, callback){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var query = "/images?lat=".concat(position.coords.latitude, "&long=", position.coords.longitude);
        //var query = "http://localhost:3000/images?lat=34.0722&long=118.4441";
        request.post({url: query, body: image}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            //callback(JSON.parse(body));
            //console.log(body);
          }
        });
      }, this.showError);
    } else {
      //Handle error
      //x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  //get whether you have upvote the post yet in json object
  getUpvote(id, callback){
    var query = "/images/".concat(id, "/up");
    request(query, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(JSON.parse(body));
      }
    });
  }

  //get whether you have downvoted the post in json
  getDownvote(id, callback){
    var query = "/images/".concat(id, "/down");
    request(query, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(JSON.parse(body));
      }
    });
  }

  //Does this need a callback?
  //upvote the image with the given id
  postUpvote(id){
    var query = "/images/".concat(id, "/up");
    request.post(query);
  }

  //Does this need a callback?
  //downvote the image with the given id
  postDownvote(id){
    var query = "/images/".concat(id, "/down");
    request.post(query);
  }

  showError (error) {
    switch (error.code) {
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
}


module.exports = new API();

window.API = module.exports;