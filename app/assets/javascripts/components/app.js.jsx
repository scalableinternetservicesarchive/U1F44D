var AppMain = require('./app_main');
var React = require('react');
var TopAppBar = require('./top_app_bar');
var PostList = require('./post_list');

var App = React.createClass({

  render: function() {
    return (
      <div>
        <TopAppBar title="SnapYak" />
        <AppMain>
          <PostList />
        </AppMain>
      </div>
    );
  }
});

module.exports = App;
