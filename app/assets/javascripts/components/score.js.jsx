var API = require('../api_stub');
var Dispatcher = require('../flux/dispatcher');
var ImageStore = require('../flux/image_store');
var StateFromStore = require('react-components/state-from-store-mixin');
var classNames = require('classnames');

var Score = React.createClass({
  getInitialState: function() {
    return {
      upClicked: false,
      downClicked: false,
    };
  },

  postUpvote: function() {
    if (this.state.upClicked) {
      return;
    }
    Dispatcher.dispatch({
      actionType: 'upvote',
      id: this.props.id
    });
    this.setState({
      upClicked: true,
      downClicked: false
    });
  },

  postDownvote: function() {
    if (this.state.downClicked) {
      return;
    }
    Dispatcher.dispatch({
      actionType: 'downvote',
      id: this.props.id
    });
    this.setState({
      downClicked: true,
      upClicked: false,
    });
  },

  render: function() {
    var upClass = this.state.upClicked ? 'up-clicked' : 'up-unclicked';
    var downClass = this.state.downClicked ? 'down-clicked' : 'down-unclicked';
    return (
      <div className="vote">
        <a className={upClass} onClick={this.postUpvote} > &#10132;</a>
        <div className="score"> votes: {this.props.score} </div>
        <a className={downClass} onClick={this.postDownvote}> &#10132;</a>
      </div>
    );
  }
})

module.exports = Score;
