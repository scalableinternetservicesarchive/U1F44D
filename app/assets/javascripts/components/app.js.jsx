var App = React.createClass({

  render: function() {
    return (
      <div>
        <TopAppBar title="SnapYak" />
        <AppMain>
          <InfiniteList />
        </AppMain>
      </div>
    );
  }
});
