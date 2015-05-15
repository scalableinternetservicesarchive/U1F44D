var Card = require('./card');
var CommentForm = require('./comment_form');
var CommentList = require('./comment_list');
var CommentStore = require('../flux/comment_store');
var Post = require('./post');
var StateFromStore = require('react-components/state-from-store-mixin');
var ImageStore = require('../flux/image_store');

var Comments = React.createClass({
  mixins: [StateFromStore({
    data: {
      store: CommentStore,
      getFetchParams: function(props) {
        return {id: props.postID};
      },
      fetch: function(store, fetchParams) {
        return store.getComments(fetchParams.id);
      }
    }
  })],

  propTypes: {
    postID: React.PropTypes.number,
  },

  render: function() {
    return (
      <div className="comments-card">
        <Card>
          <CommentForm postID={this.props.postID} />
          <CommentList data={this.state.data} />
        </Card>
      </div>
    );
  }
});

var CommentsView = React.createClass({
  mixins: [StateFromStore({
    post: {
      store: ImageStore,
      getFetchParams: function(props) {
        return {id: props.postID};
      },
      fetch: function(store, fetchParams) {
        return store.getImage(fetchParams.id);
      }
    }
  })],

  propTypes: {
    postID: React.PropTypes.number,
  },

  render() {
    console.log(this.state);
    return (
      <div>
        <Post post={this.state.post} />
        <Comments postID={this.props.postID} />
      </div>
    );
  }
});

module.exports = CommentsView;
