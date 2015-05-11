var API = require('../api_stub');
var Dispatcher = require('./dispatcher');
var Store = require('./store');

class ImageStore extends Store {
  constructor() {
    super();
    this._images = Object.create(null);

    Dispatcher.register((payload) => {
      switch (payload.actionType) {
        case 'refresh_images':
          this._images = Object.create(null);
          this.getImages();
          break;
        case 'post_image':
          this._postImage(payload.imageUri);
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

  _postImage(imageUri) {
    API.postImage(imageUri, () => {
      this._fetchImages();
    },
    (error) => {
      console.error(`Error posting image: ${error}`);
    })
  }
}

module.exports = new ImageStore();
