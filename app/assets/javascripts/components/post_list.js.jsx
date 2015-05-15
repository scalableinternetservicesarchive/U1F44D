var _ = require('underscore');
var Dispatcher = require('../flux/dispatcher');
var ImageStore = require('../flux/image_store');
var Post = require('./post');
var StateFromStore = require('react-components/state-from-store-mixin');
var VIEWS = require('../flux/view_store').VIEWS;

var PostList = React.createClass({
  mixins: [StateFromStore({
    images: {
      store: ImageStore,
      fetch: function(store) {
        return store.getImages();
      }
    }
  })],

  showComments: function(id) {
    Dispatcher.dispatch({
      actionType: 'change_view',
      view: VIEWS.COMMENTS,
      postID: id,
    });
  },

  render: function() {
    var posts = _.map(
      _.sortBy(
        this.state.images,
        (image) => image.created_at
      ).reverse(),
      (image) => {
        var callback = this.showComments.bind(this, image.id);
        return (
          <Post
            key={image.id}
            post={image}
            onClick={callback}
          />
        );
    });
    return (
      <div>
        {posts}
      </div>
    );
  }
});

module.exports = PostList;
