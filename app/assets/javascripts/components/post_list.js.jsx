var _ = require('underscore');
var ImageStore = require('../flux/image_store');
var LoadingSpinner = require('./loading_spinner');
var Post = require('./post');
var StateFromStore = require('react-components/state-from-store-mixin');

var PostList = React.createClass({
  mixins: [StateFromStore({
    images: {
      store: ImageStore,
      fetch: function(store) {
        return store.getImages();
      }
    }
  })],

  render: function() {
    var images = this.state.images;
    if (_.isEmpty(images)) {
      return <LoadingSpinner />;
    } else {
      var posts = _.map(this.state.images, (image) => {
        return <Post key={image.id} post={image} />;
      });
      return (
        <div>
          {posts}
        </div>
      );
    };
  }
});

module.exports = PostList;
