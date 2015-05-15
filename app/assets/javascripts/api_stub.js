/**
 * Created by kaceyryan on 5/2/15.
 */
var request = require('request');

class API {
  _genPath(id, action) {
    var host = window.location.host;
    var path = `http://${host}/images`;
    if (!id) {
      return path;
    }
    path = `${path}/${id}`;
    if (!action) {
      return path;
    }
    return `${path}/${action}`;
  }

  //get images in JSON object for your location
  getImages(callback, errorCallback) {
    if (!navigator.geolocation) {
      return errorCallback("Geolocation is not supported by this browser.");
    }

    navigator.geolocation.getCurrentPosition((position) => {
      request.get({
        url: this._genPath(),
        qs: {
          lat: position.coords.latitude,
          long: position.coords.longitude
        },
      }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          callback(JSON.parse(body));
        } else if (error) {
          errorCallback(`An error occurred: ${error}`);
        } else {
          errorCallback("Response returned with bad status");
        }
      });
    }, this.handleGeolocationError);
  }

  //post an image for your provided location
  postImage(imageUri, callback, errorCallback) {
    if (!navigator.geolocation) {
      return errorCallback("Geolocation is not supported by this browser.");
    }

    navigator.geolocation.getCurrentPosition((position) => {
      request.post({
        url: this._genPath(),
        qs: {
          lat: position.coords.latitude,
          long: position.coords.longitude
        },
        formData: {
          image: imageUri,
        },
      }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          callback();
        } else if (error) {
          errorCallback(`An error occurred: ${error}`);
        } else {
          errorCallback("Response returned with bad status");
        }
      });
    }, this.showError);
  }

  //get whether you have upvote the post yet in json object
  getUpvote(id, callback, errorCallback) {
    var path = this._genPath(id, 'up');
    request.get(path, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        callback(JSON.parse(body));
      } else if (error) {
        errorCallback(`An error occurred: ${error}`);
      } else {
        errorCallback("Response returned with bad status");
      }
    });
  }

  //get whether you have downvoted the post in json
  getDownvote(id, callback, errorCallback) {
    var path = this._genPath(id, 'down');
    request.get(path, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        callback(JSON.parse(body));
      } else if (error) {
        errorCallback(`An error occurred: ${error}`);
      } else {
        errorCallback("Response returned with bad status");
      }
    });
  }

  //upvote the image with the given id
  postUpvote(id, callback, errorCallback) {
    var path = this._genPath(id, 'up');
    request.post(path, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        callback();
      } else if (error) {
        errorCallback(`An error occurred: ${error}`);
      } else {
        errorCallback("Response returned with bad status");
      }
    });
  }

  //downvote the image with the given id
  postDownvote(id, callback, errorCallback) {
    var path = this._genPath(id, 'down');
    request.post(path, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        callback();
      } else if (error) {
        errorCallback(`An error occurred: ${error}`);
      } else {
        errorCallback("Response returned with bad status");
      }
    });
  }

  getComments(id, callback, errorCallback) {
    var path = this._genPath(id, 'comments');
    request.get(path, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        callback(JSON.parse(body));
      } else if (error) {
        errorCallback(`An error occurred: ${error}`);
      } else {
        errorCallback("Response returned with bad status");
      }
    });
  }

  addComment(id, text, callback, errorCallback) {
    var path = this._genPath(id, 'comments');
    request.post({
      url: path,
      qs: {
        text: text
      },
    }, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        callback(JSON.parse(body));
      } else if (error) {
        errorCallback(`An error occurred: ${error}`);
      } else {
        errorCallback("Response returned with bad status");
      }
    });
  }

  handleGeolocationError(error) {
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
