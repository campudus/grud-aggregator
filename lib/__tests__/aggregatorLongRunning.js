"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = start;

function start(step, progress, options) {
  var howLong = options.howLong;
  return Promise.resolve(0).then(step("started")).then(function (zero) {
    return zero + 1;
  }).then(step("waiting")).then(waitLonger).then(step("second")).then(function (one) {
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