var AppMain = React.createClass({

  render: function() {
    return (
      <div className="app-main">
        {this.props.children}
      </div>
    )
  }
});
