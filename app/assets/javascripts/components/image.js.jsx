var LoadingSpinner = require('./loading_spinner');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var Image = React.createClass({
  propTypes: {
    src: React.PropTypes.string,
    isAsync: React.PropTypes.bool,
  },

  getDefaultProps: function() {
    return {
      src: '',
      isAsync: true,
    };
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
// <<<<<<< HEAD
//     if (this.props.isAsync) {
//       if (this.state.loaded) {
//         return (
//           <div className="image">
//             <LoadingSpinner className="spinner-loaded" />
//             <img src={this.props.src} />
//           </div>
//         );
//       } else {
//         return (
//           <div className="image">
//             <LoadingSpinner className="spinner-loading" />
//           </div>
//         );
//       }
//     } else {
//       return (
//         <div className="image">
//           <img src={this.props.src} />
//         </div>
//       );
//     }
// =======
    if (this.props.isAsync) {
      var contents = this.state.loaded ?
        <img src={this.props.src} key={this.props.src} /> :
        <LoadingSpinner key="spinner" />;
      return (
        <div className="image">
          <CSSTransitionGroup transitionName="image">
            {contents}
          </CSSTransitionGroup>
        </div>
      );
    } else {
      return (
        <div className="image">
          <img src={this.props.src} />
        </div>
      );
    }
// >>>>>>> loading animation tweaks
  }
});

module.exports = Image;
