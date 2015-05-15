var Card = require('./card');
var Image = require('./image');
var Score = require('./score');

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
          <Score score={this.props.post.score} id={this.props.post.id}/>
        </Card>
      </div>
    );
  }
});

module.exports = Post;
