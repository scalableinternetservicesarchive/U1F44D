var API = require('../API');
var Dispatcher = require('./dispatcher');

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
}

module.exports = new ImageStore();
