var AppMain = require('./app_main');
var InfiniteList = require('./infinite_list');
var React = require('react');
var TopAppBar = require('./top_app_bar');
var Post = require('./post');

var App = React.createClass({

  render: function() {
    return (
      <div>
        <TopAppBar title="SnapYak" />
        <AppMain>
          <Post />
        </AppMain>
      </div>
    );
  }
});

module.exports = App;
