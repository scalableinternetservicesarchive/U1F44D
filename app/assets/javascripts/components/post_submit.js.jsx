var Card = require('./card');
var Dispatcher = require('../flux/dispatcher');
var Image = require('./image');

var PostSubmit = React.createClass({
  getInitialState: function() {
    return {};
  },

  submitPost: function(event) {
    event.preventDefault();
    console.log('submitting post');
    Dispatcher.dispatch({
      actionType: 'post_image',
      imageUri: this.state.fileUri
    });
  },

  changeImage: function(event) {
    var file = event.target.files && event.target.files.item(0);
    // check filetype
    var imageType = /^image\//;
    if (!imageType.test(file.type)) {
      throw new Error('Can only upload images.');
    }

    // generate image URL
    var reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        fileUri: e.target.result
      });
    };
    reader.readAsDataURL(file);
  },

  render: function() {

    return (
      <div className="post">
        <Card>
          <form onSubmit={this.submitPost}>
            <label>Upload a picture!</label>
            <input type="file" onChange={this.changeImage} />
            <button type="submit">Submit</button>
          </form>
          <Image src={this.state.fileUri} isAsync={false} />
        </Card>
      </div>
    );
  }
});

module.exports = PostSubmit;
