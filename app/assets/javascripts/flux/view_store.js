var API = require('../api_stub');
var Dispatcher = require('./dispatcher');
var Store = require('./store');

const VIEWS = {
  POSTS: 'POSTS',
  SUBMIT: 'SUBMIT',
};

class ViewStore extends Store {
  constructor() {
    super();
    this._view = VIEWS.POSTS;

    Dispatcher.register((payload) => {
      switch (payload.actionType) {
        case 'change_view':
          if (payload.view in VIEWS) {
            this._view = payload.view;
            this._notify();
          } else {
            debugger;
            throw new Error(`Cannot set view to ${payload.view}`);
          }
          break;
      }
    });
  }

  getView() {
    return this._view;
  }
}

module.exports = new ViewStore();
module.exports.VIEWS = VIEWS;
