var Card = require('./card');
var Image = require('./image');

var Post = React.createClass({
  propTypes: {
    post: React.PropTypes.object,
    onClick: React.PropTypes.func,
  },

  render: function() {
    return (
      <div className="post" onClick={this.props.onClick} >
        <Card>
          <Image src={this.props.post.url}/>
        </Card>
      </div>
    );
  }
});

module.exports = Post;
