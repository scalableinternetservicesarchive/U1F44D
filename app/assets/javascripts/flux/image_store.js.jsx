var _ = require('underscore');
var API = require('../api_stub');
var Dispatcher = require('./dispatcher');
var Store = require('./store');

class ImageStore extends Store {
  constructor() {
    super();
    this._images = Object.create(null);
    this._fetching = false;

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
        case 'fetch_images':
          this._fetchImages();
          break;
        case 'post_image':
          this._postImage(payload.imageUri);
          break;
      }
    });
  }

  _fetchImages() {
    if (this._fetching) {
      return;
    }
    this._fetching = true;
    API.getImages(
      (images) => {
        this._fetching = false;
        this._images = images;
        Dispatcher.dispatch('fetch_images_success');

        this._notify();
      },
      (error) => {
        this._fetching = false;
        var message = `Error getting images: ${error}`;
        Dispatcher.dispatch({
          actionType: 'fetch_images_fail',
          message: message,
        });
      }
    );
  }

  getImages() {
    // TODO: improve fetch logic
    if (Object.keys(this._images).length === 0) {
      Dispatcher.dispatch('fetch_images');
    }
    return this._images;
  }

  getImage(id) {
    return _.find(this._images, (image) => image.id === id);
  }

  _postImage(imageUri) {
    API.postImage(imageUri, () => {
      Dispatcher.dispatch('post_image_success');
      setTimeout(2000, () => Dispatcher.dispatch('fetch_images'));
    },
    (error) => {
      var message = `Error posting image: ${error}`;
      Dispatcher.dispatch({
        actionType: 'post_image_fail',
        message: message,
      });
    })
  }

  upvote(id) {
    console.log(id);
    var my_image = _.find(this._images, function(obj) { return obj.id == id });
    my_image.upvoted = true;
    API.postUpvote(
      id,
      (success) => {},
      (error) => {
        console.error(`Upvote error: ${error}`);
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
      (success) => {},
      (error) => {
        console.error(`Downvote error: ${error}`);
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
