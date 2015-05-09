
var Comment = React.createClass({
  propTypes: {
    author: React.PropTypes.string
  },

  render: function() {
    return (
      <div className="comment">
        <span className="comment-author">
          {this.props.author}
        </span>
        <span className="comment-text">
          {this.props.children}
        </span>
      </div>
    );
  }
});

module.exports = Comment;
