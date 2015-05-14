var _ = require('underscore');
var ImageStore = require('../flux/image_store');
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
    var posts = _.map(this.state.images, (image) => {
      return <Post key={image.id} post={image} />;
    });
    return (
      <div>
        {posts}
      </div>
    );
  }
});

module.exports = PostList;
