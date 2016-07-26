'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = start;
function start(_ref) {
  var step = _ref.step;

  return Promise.resolve().then(step('step A')).then(step('step B')).then(step('step C')).then(step('step D'));
}
module.exports = exports['default'];