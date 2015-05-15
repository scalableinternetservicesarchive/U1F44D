var AppMain = require('./app_main');
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
    }
  })],

  render: function() {
    var contents;
    if (this.state.view === ViewStore.VIEWS.POSTS) {
      contents = <PostList />;
    } else if (this.state.view === ViewStore.VIEWS.SUBMIT) {
      contents = <PostSubmit />;
    } else {
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
