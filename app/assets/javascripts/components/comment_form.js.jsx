var Dispatcher = require('../flux/dispatcher');

var CommentForm = React.createClass({
  propTypes: {
    postID: React.PropTypes.number,
  },

  getInitialState: function() {
    return {
      comment: '',
    };
  },

  _changeComment: function(event) {
    this.setState({
      comment: event.target.value
    });
  },

  _submitComment: function(event) {
    event.preventDefault();
    // don't submit empty comments
    if (!this.state.comment) {
      return;
    }
    Dispatcher.dispatch({
      actionType: 'add_comment',
      id: this.props.postID,
      text: this.state.comment,
    });
    this.setState({
      comment: ''
    });
  },

  render: function() {
    return (
      <div className="comment-form">
        <textarea
          rows="2"
          cols="30"
          onChange={this._changeComment}
        >{this.state.comment}</textarea>
        <input type="submit" onClick={this._submitComment} value="Comment" />
      </div>
    );
  }
});

module.exports = CommentForm;
