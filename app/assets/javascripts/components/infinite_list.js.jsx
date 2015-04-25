var ListItem = require('./list_item');
var LoadingSpinner = require('./loading_spinner');
var React = require('react');
var InfiniteScroll = require('react-infinite-scroll')(React);

var InfiniteList = React.createClass({
  getInitialState: function () {
    return {
      numItems: 0,
      hasMore: true
    };
  },

  render: function() {
    var setNumItems = (i) => {
      setTimeout( () => {
        this.setState({
          numItems: i,
          hasMore: i < 10
        });
      }, 1000);
    };
    var items = [];
    for (var i = 0; i < this.state.numItems; i++) {
      items.push(<ListItem key={`listitem-${i}`}/>);
    }
    var loadingIndicator = (
      <div className="center-spinner">
        <LoadingSpinner />
      </div>
    );
    return (
      <div className="infinite-list">
        <InfiniteScroll
          pageStart={0}
          loadMore={setNumItems}
          hasMore={this.state.hasMore}
          loader={loadingIndicator}>
          {items}
        </InfiniteScroll>
      </div>
    );
  }
});

module.exports = InfiniteList;
