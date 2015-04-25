var TopAppBar = React.createClass({
  propTypes: {
    title: React.PropTypes.string
  },

  render: function() {
    return (
      <div className="app-bar">
        <nav>
          <h1>{this.props.title}</h1>
        </nav>
      </div>
    );
  }
});
