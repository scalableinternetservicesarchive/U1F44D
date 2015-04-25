var React = require('react');

var LoadingSpinner = React.createClass({

  render: function() {
    return (
      <svg className="loading-spinner">
        <circle cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
      </svg>
    );
  }
});

module.exports = LoadingSpinner;
