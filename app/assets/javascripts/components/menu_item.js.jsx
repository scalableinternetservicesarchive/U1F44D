var React = require('react');

var MenuItem = React.createClass({

  navigate: function(hash) {
    window.location.hash = hash;
  },

  render: function() {
    var classStyle = "menu-item";
    if (this.props.hash === "share-facebook" || this.props.hash === "get-started") {
      classStyle += " first-item";
    }
    return <div className={classStyle} onClick={this.navigate.bind(this, this.props.hash)}>{this.props.children}</div>;
  }

});

module.exports = MenuItem;