var Card = require('./card');
var LoadingImage = require('./loading_image');
var CommentBox = require('./comment_box');
var React = require('react');

var Post = React.createClass({

  render: function() {
    return (
      <div className="post">
        <Card>
          <LoadingImage />
          <p>
            Lorem ipsum dolor sit amet eiusmod, consectetur
            adipiscing elit, sed do .
            </p>
            <CommentBox />
        </Card>
      </div>
    );
  }
});

module.exports = Post;
