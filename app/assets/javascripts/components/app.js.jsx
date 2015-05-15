var AppMain = require('./app_main');
var CommentsView = require('./comments_view');
var TopAppBar = require('./top_app_bar');
var PostList = require('./post_list');
var PostSubmit = require('./post_submit');
var StateFromStore = require('react-components/state-from-store-mixin');
var ViewStore = require('../flux/view_store');

var App = React.createClass({
  mixins: [StateFromStore({
    view: {
      store: ViewStore,
      fetch: function(store) {
        return store.getView();
      }
    },
    commentsPostID: {
      store: ViewStore,
      fetch: function(store) {
        return store.getPostID();
      }
    }
  })],

  render: function() {
    var contents;
    switch (this.state.view) {
      case ViewStore.VIEWS.POSTS:
        contents = <PostList />;
        break;
      case ViewStore.VIEWS.SUBMIT:
        contents = <PostSubmit />;
        break;
      case ViewStore.VIEWS.COMMENTS:
        contents = <CommentsView postID={this.state.commentsPostID} />;
        break;
      default:
        throw new Error(`Unsupported view ${this.state.view}`);
    }

    return (
      <div>
        <TopAppBar title="SnapYak" />
        <AppMain>
          {contents}
        </AppMain>
      </div>
    );
  }
});

module.exports = App;
