var _ = require('underscore');
var Comment= require('./comment');

var CommentList = React.createClass({
  propTypes: {
    data: React.PropTypes.object
  },

  render: function() {
    var commentNodes = _.map(
      _.sortBy(this.props.data, (comment) => comment.created_at).reverse(),
      (comment) => <Comment>{comment.text}</Comment>
    );
    return (
      <div className="comment-list">
        {commentNodes}
      </div>
    );
  }
});

module.exports = CommentList;
