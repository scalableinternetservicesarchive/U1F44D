var Comment= require('./comment');

var CommentList = React.createClass({
  propTypes: {
    data: React.PropTypes.object
  },

  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="comment-list">
        {commentNodes}
      </div>
    );
  }
});

module.exports = CommentList;
