"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = start;
var _ = _interopRequireWildcard(require("lodash"));
var _child_process = _interopRequireDefault(require("child_process"));
var _excluded = ["aggregatorFile", "progress", "timeoutToResendStatus"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function start() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    aggregatorFile = _ref.aggregatorFile,
    progress = _ref.progress,
    _ref$timeoutToResendS = _ref.timeoutToResendStatus,
    timeoutToResendStatus = _ref$timeoutToResendS === void 0 ? 2000 : _ref$timeoutToResendS,
    rest = _objectWithoutProperties(_ref, _excluded);
  if (_.isNil(aggregatorFile) || _.isEmpty(aggregatorFile)) {
    throw new Error("Need to supply the filename of the aggregator");
  }
  if (!_.isNil(progress) && !_.isFunction(progress)) {
    throw new Error("Expects function for optional `progress` parameter");
  }
  return Promise.resolve().then(function () {
    return new Promise(function (resolve, reject) {
      var child = _child_process.default.fork("".concat(__dirname, "/forker.js"), {
        silent: false
      });
      var initialized = false;
      var fulfilled = false;
      var allDone = false;
      var allSteps = 0;
      var resendProgressTimerId = null;
      var result;
      child.on("message", function (_ref2) {
        var action = _ref2.action,
          payload = _ref2.payload,
          data = _ref2.data;
        if (action === "INIT") {
          initialized = true;
          allSteps = payload.stepsInAggregator;
          sendProgress({
            message: "Starting aggregator ".concat(aggregatorFile),
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
          result = data;
          child.kill();
        }
      });
      child.on("close", fulfill);
      child.on("error", function (err) {
        if (!fulfilled) {
          fulfilled = true;
          console.log("Aggregator broke due to an uncaught error ".concat(err.message));
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
        if (resendProgressTimerId !== null) {
          clearTimeout(resendProgressTimerId);
        }
        if (!fulfilled) {
          fulfilled = true;
          if (allDone) {
            resolve({
              result: result
            });
          } else if (!initialized) {
            reject(new Error("Could not start up aggregator ".concat(aggregatorFile, ". Correct path? Uncaught exception in init?")));
          } else if (signal !== null) {
            reject(new Error("Aggregator got killed with signal ".concat(signal)));
          } else if (code !== 0) {
            reject(new Error("Aggregator broke, possible uncaught exception. Exit code ".concat(code)));
          } else {
            resolve({
              result: result,
              code: code,
              signal: signal
            });
          }
        }
      }
    });
  });
}