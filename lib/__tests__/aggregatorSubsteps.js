"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = start;
function start(step) {
  return Promise.resolve(0).then(add("one")).then(mult("two")).then(add("three")).then(mult("four")).then(add("five")).then(mult("six")).then(step("seven"));

  function add(message) {
    var addStep = step(message);
    return function (data) {
      return Promise.resolve(data).then(addStep).then(function (data) {
        return new Promise(function (resolve) {
          setTimeout(function () {
            var result = data + 1;
            resolve(result);
          }, Math.random() * 50);
        });
      });
    };
  }

  function mult(message) {
    var multStep = step(message);
    return function (data) {
      return Promise.resolve(data).then(multStep).then(function (data) {
        return new Promise(function (resolve) {
          setTimeout(function () {
            var result = data * 2;
            resolve(result);
          }, Math.random() * 50);
        });
      });
    };
  }
}
module.exports = exports["default"];