var API = require('../api_stub');
var Dispatcher = require('./dispatcher');
var Store = require('./store');

const VIEWS = {
  COMMENTS: 'COMMENTS',
  POSTS: 'POSTS',
  SUBMIT: 'SUBMIT',
};

const NOTIFICATION_EXPIRY = 5000;

class ViewStore extends Store {
  constructor() {
    super();
    this._view = VIEWS.POSTS;
    this._postID = 1;
    this._isLoading = false;
    this._notifications = [];

    Dispatcher.register((payload) => {
      switch (payload.actionType) {
        case 'change_view':
          if (payload.view in VIEWS) {
            this._view = payload.view;
            this._postID = payload.postID;
            this._notify();
          } else {
            throw new Error(`Cannot set view to ${payload.view}`);
          }
          break;
        case 'fetch_images':
        case 'post_image':
          this._isLoading = true;
          this._notify();
          break;
        case 'fetch_images_success':
        case 'post_image_success':
          this._isLoading = false;
          this._notify();
          break;
        case 'fetch_images_fail':
        case 'post_image_fail':
          this._isLoading = false;
          this._addNotification(payload.message);
          this._notify();
          break;
      }
    });
  }

  getView() {
    return this._view;
  }

  getPostID() {
    return this._postID;
  }

  getNotifications() {
    return this._notifications;
  }

  _addNotification(n) {
    this._notifications.push(n);
    setTimeout(NOTIFICATION_EXPIRY, () => {
      this._notifications.shift();
      this._notify();
    });
  }

  isLoading() {
    return this._isLoading;
  }
}

module.exports = new ViewStore();
module.exports.VIEWS = VIEWS;
