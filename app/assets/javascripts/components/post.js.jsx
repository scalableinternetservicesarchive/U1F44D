var Card = require('./card');
var Image = require('./image');
var Score = require('./score');

var Post = React.createClass({
  propTypes: {
    post: React.PropTypes.object
  },

  render: function() {
      console.log(this.props.post);
    return (
      <div className="post">
        <Card>
          <Image src={this.props.post.url}/>
          <p>
            Lorem ipsum dolor sit amet eiusmod, consectetur
            adipiscing elit, sed do .
          </p>
          <Score score={this.props.post.score} id={this.props.post.id}/>
        </Card>
      </div>
    );
  }
});

module.exports = Post;
