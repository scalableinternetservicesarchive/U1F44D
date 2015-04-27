var LoadingSpinner = require('./loading_spinner');
var React = require('react');

var LoadingImage = React.createClass({

  render: function() {
    return (
      <div className="loading-image">
        <LoadingSpinner />
      </div>
    );
  }
});

module.exports = LoadingImage;
