var assign = require('object-assign');
var entries = require('object.entries');

module.exports = function () {
  var allCallbacks = {};
  var callbacksLength = 0;

  var prevTime = 0;

  var now = function () {
    return prevTime;
  };

  var raf = function (callback) {
    callbacksLength += 1;

    allCallbacks[callbacksLength] = callback;

    return callbacksLength;
  };

  var cancel = function (id) {
    delete allCallbacks[id];
  };

  var step = function (opts) {
    var options = assign({}, {
      time: 1000 / 60,
      count: 1
    }, opts);

    var oldAllCallbacks;

    for (var i = 0; i < options.count; i++) {
      oldAllCallbacks = allCallbacks;
      allCallbacks = {};

      entries(oldAllCallbacks).forEach(function ([ id, callback ]) {
        callback(prevTime + options.time);
      });

      prevTime += options.time;
    }
  }

  return {
    now: now,
    raf: raf,
    cancel: cancel,
    step: step
  };
};
