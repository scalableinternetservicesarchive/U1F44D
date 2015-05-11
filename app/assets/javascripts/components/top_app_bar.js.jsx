var Dispatcher = require('../flux/dispatcher');
var ViewStore = require('../flux/view_store');

var TopAppBar = React.createClass({
  propTypes: {
    title: React.PropTypes.string
  },

  viewPosts: function() {
    Dispatcher.dispatch({
      actionType: 'change_view',
      view: ViewStore.VIEWS.POSTS,
    });
  },

  submitPost: function() {
    Dispatcher.dispatch({
      actionType: 'change_view',
      view: ViewStore.VIEWS.SUBMIT,
    });
  },

  render: function() {
    return (
      <div className="app-bar">
        <nav>
          <span className="nav-title">{this.props.title}</span>
          <span className="nav-links">
            <a onClick={this.viewPosts}>View Images</a>
            <a onClick={this.submitPost}>Submit Image</a>
          </span>
        </nav>
      </div>
    );
  }
});

module.exports = TopAppBar;
