"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = start;

function start(step, progress, options) {
  return Promise.resolve(options.expectedResult);
}

module.exports = exports.default;