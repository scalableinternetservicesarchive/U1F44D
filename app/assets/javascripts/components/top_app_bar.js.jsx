var CSSTransitionGroup = React.addons.CSSTransitionGroup;
var Dispatcher = require('../flux/dispatcher');
var LoadingSpinner = require('./loading_spinner');
var StateFromStore = require('react-components/state-from-store-mixin');
var ViewStore = require('../flux/view_store');

var Notification = React.createClass({
  propTypes: {
    message: React.PropTypes.string
  },

  render: function() {
    return <span className="notification">{this.props.message}</span>;
  }
})

var TopAppBar = React.createClass({
  mixins: [StateFromStore({
    isLoading: {
      store: ViewStore,
      fetch: function(store) {
        return store.isLoading();
      }
    },
    notifications: {
      store: ViewStore,
      fetch: function(store) {
        return store.getNotifications();
      }
    }
  })],

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
    var notifications = this.state.notifications.map((n) => {
      return <Notification message={n} />;
    });
    var loadingSpinner = this.state.isLoading ?
      <LoadingSpinner key="loading-spinner" /> :
      undefined;
    return (
      <div>
        <div className="app-bar">
          <nav>
            <span className="nav-title">{this.props.title}</span>
            <span className="nav-links">
              <a onClick={this.viewPosts}>View Images</a>
              <a onClick={this.submitPost}>Submit Image</a>
            </span>
          </nav>
        </div>
        <div className="message-box">
          <CSSTransitionGroup transitionName="notification">
            {notifications}
            {loadingSpinner}
          </CSSTransitionGroup>
        </div>
      </div>
    );
  }
});

module.exports = TopAppBar;
