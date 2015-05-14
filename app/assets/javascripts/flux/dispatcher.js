var FluxDispatcher = require('flux').Dispatcher;

class Dispatcher extends FluxDispatcher {
  dispatch(payload) {
    if (typeof payload === 'string') {
      super.dispatch({
        actionType: payload
      });
    } else {
      super.dispatch(payload);
    }
  }
}

module.exports = new Dispatcher();
