"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = start;
function start(step) {
  return Promise.resolve().then(step("step A")).then(function () {
    return Promise.reject(new Error("oops"));
  });
}
module.exports = exports["default"];