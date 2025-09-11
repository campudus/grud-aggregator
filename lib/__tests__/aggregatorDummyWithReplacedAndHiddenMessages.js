"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = start;
function start(step) {
  var stepA = step("step A");
  var stepB = step("step B");
  var stepC = step("step C");
  var stepD = step("step D");
  return Promise.resolve().then(stepA).then(function (data) {
    return stepB(data, {
      message: "step B - REPLACED!"
    });
  }).then(function (data) {
    return stepC(data, {
      suppress: true
    });
  }).then(stepD);
}
module.exports = exports.default;