var LoadingSpinner = require('./loading_spinner');

var Image = React.createClass({
  propTypes: {
    src: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      loaded: false,
    };
  },

  onLoad: function() {
    if (this.isMounted()) {
      this.setState({
        loaded: true,
      });
    }
  },

  componentDidMount: function() {
    // create <img> without putting it in the DOM
    var image = new window.Image();
    image.src = this.props.src;
    image.onload = this.onLoad;
  },

  render() {
    if (this.state.loaded) {
      return (
        <div className="image">
          <LoadingSpinner className="spinner-loaded" />
          <img src={this.props.src} />
        </div>
      );
    } else {
      return (
        <div className="image">
          <LoadingSpinner className="spinner-loading" />
        </div>
      );
    }
  }
});

module.exports = Image;
