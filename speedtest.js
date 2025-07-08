function Speedtest() {
  this._serverList = [];
  this._selectedServer = null;
  this._settings = {};
  this._state = 0;
}

Speedtest.prototype = {
  constructor: Speedtest,
  getState: function() {
    return this._state;
  },
  setParameter: function(parameter, value) {
    if (this._state == 3) throw "No se puede cambiar configuración durante la prueba";
    this._settings[parameter] = value;
  },
  start: function() {
    if (this._state == 3) throw "La prueba ya está en curso";
    this.worker = new Worker("speedtest_worker.js");
    this.worker.onmessage = function(e) {
      const data = JSON.parse(e.data);
      if (this.onupdate) this.onupdate(data);
      if (data.testState >= 4 && this.onend) this.onend(data.testState == 5);
    }.bind(this);
    this._state = 3;
    this.worker.postMessage("start " + JSON.stringify(this._settings));
  },
  abort: function() {
    if (this._state < 3) throw "La prueba no ha comenzado";
    this.worker.postMessage("abort");
  }
};

