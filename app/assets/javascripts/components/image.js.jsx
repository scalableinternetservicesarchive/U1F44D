var ImageLoader = require('react-imageloader');
var LoadingSpinner = require('./loading_spinner');
var React = require('react');

var Image = React.createClass({
  propTypes: {
    src: React.PropTypes.string
  },

  render: function() {
    var loadingSpinner = () => <LoadingSpinner />;
    return (
      <div className="image">
        <ImageLoader src={this.props.src} preloader={loadingSpinner}>
          Image loading failed!
        </ImageLoader>
      </div>
    );
  }
});

module.exports = Image;
