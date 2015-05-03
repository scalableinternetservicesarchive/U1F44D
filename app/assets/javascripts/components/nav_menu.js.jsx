var React = require('react');

var NavMenu = React.createClass({

  getInitialState: function(){
    return { focused: 0 };
  },

  clicked: function(index){
    this.setState({focused: index});
  },

  render: function() {
    var self = this;
    return (
      <span>
      <ul>{
        this.props.items.map(function(m, index){
          var style = '';
            if(self.state.focused == index){
              style = 'focused';
            }
            return (
              <li className={style} onClick={self.clicked.bind(self, index)}>{m}</li>
            );
        })
      }
      </ul>
      </span>
    );
  }
});

module.exports = NavMenu;
