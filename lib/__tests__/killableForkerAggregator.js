"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = start;
var wait = function wait() {
  return new Promise(function (resolve) {
    process.once("SIGINT", function () {
      process.disconnect();
      resolve();
    });
  });
};

function start(step, progress, options) {
  return Promise.resolve().then(step(process.pid)).then(wait).then(step("second step (channel should be closed)")).then(function () {
    process.kill(options.pid, "SIGINT");
  }).catch(function (err) {
    console.log("should not get here", err);
    throw err;
  });
}
module.exports = exports["default"];