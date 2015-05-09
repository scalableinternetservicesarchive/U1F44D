var CommentList = require('./comment_list');
var CommentForm = require('./comment_form');
var React = require('react');

var data = [
  {author: "Vicky Zhang", text: " This is one comment This is one comment " +
  "This is one comment This is one comment This is one comment"},
  {author: "Vicky Zhang", text: "This is one comment"},
  {author: "Vicky Zhang", text: "This is one comment"},
  {author: "Vicky Zhang", text: "This is one comment"},
  {author: "Vicky Zhang", text: "This is one comment"},
  {author: "Vicky Zhang", text: "This is one comment"},
  {author: "Vicky Zhang", text: "This is one comment"},
  {author: "Vicky Zhang", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is another comment"}
];

var CommentBox = React.createClass({

  getInitialState: function() {
    return {data: data};
  },

  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
  },

  render: function() {
    return (
      <div className="comment-box">
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

module.exports = CommentBox;
