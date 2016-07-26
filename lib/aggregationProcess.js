'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = start;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function start() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var aggregator = _ref.aggregator;
  var progress = _ref.progress;


  if (_lodash2.default.isNil(aggregator) || _lodash2.default.isEmpty(aggregator)) {
    throw new Error('Need to supply the filename of the aggregator');
  }

  if (!_lodash2.default.isNil(progress) && !_lodash2.default.isFunction(progress)) {
    throw new Error('Expects function for optional `progress` parameter');
  }

  return Promise.resolve().then(function () {
    return new Promise(function (resolve, reject) {
      var child = _child_process2.default.fork(__dirname + '/forker.js', [aggregator], { silent: false });
      var initialized = false;
      var fulfilled = false;
      var allDone = false;
      var allSteps = 0;

      child.on('message', function (_ref2) {
        var action = _ref2.action;
        var payload = _ref2.payload;

        if (action === 'INIT') {
          initialized = true;
          allSteps = payload.stepsInAggregator;
          if (progress) {
            progress({
              message: 'Starting aggregator ' + aggregator,
              currentStep: 0,
              steps: allSteps
            });
          }
        } else if (action === 'PROGRESS' && progress) {
          progress(payload);
        } else if (action === 'DONE') {
          if (progress) {
            progress(payload);
          }
          allDone = true;
          child.kill();
        }
      });
      child.on('close', fulfill);

      child.on('error', function (err) {
        if (!fulfilled) {
          fulfilled = true;
          console.log('Aggregator broke due to an uncaught error ' + err.message);
          reject(err);
        }
      });

      child.on('exit', fulfill);

      function fulfill(code, signal) {
        if (!fulfilled) {
          fulfilled = true;
          if (allDone) {
            resolve();
          } else if (!initialized) {
            reject(new Error('Could not start up aggregator ' + aggregator + '. Correct path? Uncaught exception in init?'));
          } else if (signal !== null) {
            reject(new Error('Aggregator got killed with signal ' + signal));
          } else if (code !== 0) {
            reject(new Error('Aggregator broke, possible uncaught exception. Exit code ' + code));
          } else {
            resolve({ code: code, signal: signal });
          }
        }
      }
    });
  });
}