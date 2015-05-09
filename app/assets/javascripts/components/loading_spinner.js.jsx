var classNames = require('classnames');

var LoadingSpinner = React.createClass({

  render: function() {
    var classes = classNames('spinner', this.props.className);
    return (
      <svg className={classes}>
        <circle cx="50" cy="50" r="20" fill="none" strokeWidth="2" />
      </svg>
    );
  }
});

module.exports = LoadingSpinner;
