var React = require('react');
var NavMenu = require('./nav_menu');
var Menu = require('./slide_menu');
var MenuItem = require('./menu_item');

var TopAppBar = React.createClass({
  propTypes: {
    title: React.PropTypes.string
  },
  showLeft: function() {
    this.refs.left.show();
  },
  render: function() {
    return (
      <div className="app-bar">
        <nav>
            <span className="nav-title">{this.props.title}</span>
            <NavMenu items={ ['Home', 'Photo'] } />
            <a className="menu-btn" onClick={this.showLeft}>&#9776;</a>
            <div>
                <Menu ref="left" alignment="left">
                    <MenuItem hash="home">Home</MenuItem>
                    <MenuItem hash="posts">Posts</MenuItem>
                    <MenuItem hash="share-facebook">Share on Facebook</MenuItem>
                    <MenuItem hash="share-twitter">Share on Twitter</MenuItem>
                    <MenuItem hash="share-pinterest">Share on Pinterest</MenuItem>
                    <MenuItem hash="get-started">Get Started</MenuItem>
                    <MenuItem hash="gitHub">GitHub</MenuItem>
                    <MenuItem hash="about-us">About Us</MenuItem>
                </Menu>
            </div>
        </nav>
      </div>
    );
  }
});

module.exports = TopAppBar;
