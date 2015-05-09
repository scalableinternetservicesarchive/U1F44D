
var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
    return;
  },

  render: function() {
    return (
      <form className="comment-form" onSubmit={this.handleSubmit}>
        <input type="text" className="new-comment-name"
               placeholder="Name" ref="author" />
        <input type="text" className="new-comment-text"
               placeholder="Write a comment..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

module.exports = CommentForm;
