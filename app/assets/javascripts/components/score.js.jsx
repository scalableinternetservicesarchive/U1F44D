var API = require('../api_stub');
var Dispatcher = require('../flux/dispatcher');

var Score = React.createClass({

  postUpvote: function() {
    console.log(this.props);
    Dispatcher.dispatch({
      actionType: 'upvote',
      id: this.props.id
    });
  },

  postDownvote: function() {
    Dispatcher.dispatch({
      actionType: 'downvote',
      id: this.props.id
    });
  },

  render: function() {
    return (
      <div className="vote">
        <a onClick={this.postUpvote}> Up Vote! </a>
        <span> {this.props.score} </span>
        <a onClick={this.postDownvote}> Down Vote! </a>
      </div>
    );
  }
})

module.exports = Score;
