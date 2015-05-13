var API = require('../api_stub');
var Dispatcher = require('./dispatcher');
var _ = require('underscore');

class ImageStore {
  constructor() {
    this._images = Object.create(null);
    this._listeners = [];

    Dispatcher.register((payload) => {
      switch (payload.actionType) {
        case 'refresh_images':
          this._images = Object.create(null);
          this.getImages();
          break;
        case 'upvote':
          var id = payload.id;
          this.upvote(id);
          break;
        case 'downvote':
          var id = payload.id;
          this.downvote(id);
          break;
      }
    });
  }

  _fetchImages() {
    API.getImages(
      (images) => {
        this._images = images;
        this._notify();
      },
      (error) => {
        console.error(`Error getting images: ${error}`);
      }
    );
  }

  getImages() {
    if (Object.keys(this._images).length === 0) {
      this._fetchImages();
    }
    return this._images;
  }

  _notify() {
    this._listeners.forEach((callback) => callback());
  }

  addChangeListener(callback) {
    this._listeners.unshift(callback);
  }

  removeChangeListener(key) {
    var index = this._listeners.indexOf(key);
    if (index > -1) {
      this._listeners.splice(index, 1);
    }
  }

  upvote(id) {
    console.log(id);
    var my_image = _.find(this._images, function(obj) { return obj.id == id });
    my_image.upvoted = true;
    API.postUpvote(
      id,
      (success) => {
        console.log("success");
      },
      (error) => {
        console.error('Error upvote');
      }
    );
      if (this.isDownvoted(id)) {
        my_image.score++;
      }
      my_image.score++;
      this._notify();
  }

  downvote(id) {
    var my_image = _.find(this._images, function(obj) { return obj.id == id });
    my_image.downvoted = true;
    API.postDownvote(
      id,
      (success) => {
        console.log("success");
      },
      (error) => {
        console.error('Error downvote');
      }
    );
      if (this.isUpvoted(id)) {
        my_image.score--;
      }
      my_image.score--;
      this._notify();
  }

  isUpvoted(id) {
    return _.find(this._images, function(obj) { return obj.id == id }).upvoted;
  }

  isDownvoted(id) {
    return _.find(this._images, function(obj) { return obj.id == id }).downvoted;
  }
}

module.exports = new ImageStore();
