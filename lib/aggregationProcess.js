"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = start;

var _lodash = require("lodash");

var _ = _interopRequireWildcard(_lodash);

var _child_process = require("child_process");

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function start() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var aggregatorFile = _ref.aggregatorFile,
      progress = _ref.progress,
      _ref$timeoutToResendS = _ref.timeoutToResendStatus,
      timeoutToResendStatus = _ref$timeoutToResendS === undefined ? 2000 : _ref$timeoutToResendS,
      rest = _objectWithoutProperties(_ref, ["aggregatorFile", "progress", "timeoutToResendStatus"]);

  if (_.isNil(aggregatorFile) || _.isEmpty(aggregatorFile)) {
    throw new Error("Need to supply the filename of the aggregator");
  }

  if (!_.isNil(progress) && !_.isFunction(progress)) {
    throw new Error("Expects function for optional `progress` parameter");
  }

  return Promise.resolve().then(function () {
    return new Promise(function (resolve, reject) {
      var child = _child_process2.default.fork(__dirname + "/forker.js", { silent: false });
      var initialized = false;
      var fulfilled = false;
      var allDone = false;
      var allSteps = 0;
      var resendProgressTimerId = null;

      child.on("message", function (_ref2) {
        var action = _ref2.action,
            payload = _ref2.payload;

        if (action === "INIT") {
          initialized = true;
          allSteps = payload.stepsInAggregator;
          sendProgress({
            message: "Starting aggregator " + aggregatorFile,
            currentStep: 0,
            steps: allSteps
          });
        } else if (action === "PROGRESS") {
          sendProgress(payload);
        } else if (action === "DONE") {
          sendProgress(payload);
          if (resendProgressTimerId !== null) {
            clearTimeout(resendProgressTimerId);
            resendProgressTimerId = null;
          }
          allDone = true;
          child.kill();
        }
      });

      child.on("close", fulfill);

      child.on("error", function (err) {
        if (!fulfilled) {
          fulfilled = true;
          console.log("Aggregator broke due to an uncaught error " + err.message);
          reject(err);
        }
      });

      child.on("exit", fulfill);

      child.send({
        action: "run",
        data: {
          aggregatorFile: aggregatorFile,
          options: rest
        }
      });

      function sendProgress(payload) {
        if (resendProgressTimerId !== null) {
          clearTimeout(resendProgressTimerId);
        }
        if (progress) {
          progress(payload);
        }
        resendProgressTimerId = setTimeout(function () {
          sendProgress(payload);
        }, timeoutToResendStatus);
      }

      function fulfill(code, signal) {
        if (!fulfilled) {
          fulfilled = true;
          if (allDone) {
            resolve();
          } else if (!initialized) {
            reject(new Error("Could not start up aggregator " + aggregatorFile + ". Correct path? Uncaught exception in init?"));
          } else if (signal !== null) {
            reject(new Error("Aggregator got killed with signal " + signal));
          } else if (code !== 0) {
            reject(new Error("Aggregator broke, possible uncaught exception. Exit code " + code));
          } else {
            resolve({
              code: code,
              signal: signal
            });
          }
        }
      }
    });
  });
}