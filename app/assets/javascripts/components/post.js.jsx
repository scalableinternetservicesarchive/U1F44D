var Card = require('./card');
var Image = require('./image');
var React = require('react');

var Post = React.createClass({
  propTypes: {
    post: React.PropTypes.object,
  },

  render: function() {
    return (
      <div className="post">
        <Card>
          <Image src={this.props.post.url}/>
          <p>
            Lorem ipsum dolor sit amet eiusmod, consectetur
            adipiscing elit, sed do .
          </p>
        </Card>
      </div>
    );
  }
});

module.exports = Post;
