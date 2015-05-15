var API = require('../api_stub');
var Dispatcher = require('./dispatcher');
var Store = require('./store');

class CommentStore extends Store {
  constructor() {
    super();
    this._comments = Object.create(null);

    Dispatcher.register((payload) => {
      switch (payload.actionType) {
        case 'fetch_comments':
          this._fetchComments(payload.id);
          break;
        case 'add_comment':
          this._addComment(payload.id, payload.text);
          break;
      }
    });
  }

  _addComment(id, text) {
    API.addComment(id, text, (response) => {
      this._comments[id] = response;
      this._notify();
      this._fetchComments(id);
    }, (error) => {
      console.error('error: ', error);
    });
  }

  _fetchComments(id) {
    API.getComments(id, (comments) => {
      console.log(comments);
      this._comments[id] = comments;
      this._notify();
    }, (error) => {
      console.error(error);
    });
  }

  getComments(id) {
    // TODO: improve request logic
    if (!(id in this._comments)) {
      Dispatcher.dispatch({
        actionType: 'fetch_comments',
        id: id
      });
    }
    return this._comments[id];
  }
}

module.exports = new CommentStore();
