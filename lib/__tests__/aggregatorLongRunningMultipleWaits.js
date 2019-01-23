"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = start;

function start(step, progress, options) {
  var howLong = options.howLong;
  return Promise.resolve(0).then(step("started")).then(function (zero) {
    return zero + 1;
  }).then(step("waiting 1")).then(waitLonger).then(step("waiting 2")).then(waitLonger).then(step("waiting 3")).then(waitLonger).then(step("waiting 4")).then(waitLonger).then(step("second")).then(function (one) {
    return one + 1;
  });

  function waitLonger(message) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(message);
      }, howLong);
    });
  }
}

module.exports = exports.default;