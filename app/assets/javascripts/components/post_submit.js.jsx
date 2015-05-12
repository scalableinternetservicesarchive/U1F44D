var Card = require('./card');
var Dispatcher = require('../flux/dispatcher');
var Image = require('./image');

var PostSubmitForm = React.createClass({
  propTypes: {
    fileUri: React.PropTypes.string,
  },

  submitPost: function(event) {
    event.preventDefault();
    Dispatcher.dispatch({
      actionType: 'post_image',
      imageUri: this.props.fileUri
    });
  },

  render: function() {
    var label = this.props.fileUri ?
      undefined :
      <label>Upload a picture!</label>;
    var submitButton = this.props.fileUri ?
      <button type="submit">Submit</button> :
      undefined;
    return (
      <form className="image-submit-form" onSubmit={this.submitPost}>
        {label}
        <div className="fake-input">+</div>
        <input type="file" onChange={this.props.onChange} />
        {submitButton}
      </form>
    );
  }
});

var PostSubmit = React.createClass({
  getInitialState: function() {
    return {};
  },

  submitPost: function(event) {
    event.preventDefault();
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
          <Image src={this.state.fileUri} isAsync={false}>
            <PostSubmitForm
              fileUri={this.state.fileUri}
              onChange={this.changeImage} />
          </Image>
        </Card>
      </div>
    );
  }
});

module.exports = PostSubmit;
