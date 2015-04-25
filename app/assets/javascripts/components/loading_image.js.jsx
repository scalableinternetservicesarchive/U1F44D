var LoadingImage = React.createClass({

  render: function() {
    return (
      <div className="loading-image">
        <svg className="circular">
          <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
        </svg>
      </div>
    );
  }
});
