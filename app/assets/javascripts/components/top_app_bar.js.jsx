
var TopAppBar = React.createClass({
  propTypes: {
    title: React.PropTypes.string
  },

  render: function() {
    return (
      <div className="app-bar">
        <nav>
          <span className="nav-title">{this.props.title}</span>
        </nav>
      </div>
    );
  }
});

module.exports = TopAppBar;
