"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = start;
var wait = function wait() {
  return new Promise(function (resolve) {
    process.once("SIGHUP", function () {
      process.disconnect();
      resolve();
    });
  });
};

function start(step, progress, options) {
  return Promise.resolve().then(step(process.pid)).then(wait).then(step("second step (channel should be closed)")).then(function () {
    process.kill(options.pid, "SIGHUP");
  }).catch(function (err) {
    console.log("should not get here", err);
    throw err;
  });
}
module.exports = exports["default"];