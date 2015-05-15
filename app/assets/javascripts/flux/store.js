
class Store {
  constructor() {
    this._listeners = [];
  }

  _notify() {
    this._listeners.forEach((callback) => callback());
  }

  addChangeListener(callback) {
    this._listeners.unshift(callback);
  }

  removeChangeListener(key) {
    var index = this._listeners.indexOf(key);
    if (index > -1) {
      this._listeners.splice(index, 1);
    }
  }
}

module.exports = Store;
