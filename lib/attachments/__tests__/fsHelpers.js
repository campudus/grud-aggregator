'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanUpWhenDone = cleanUpWhenDone;
exports.statOf = statOf;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _must = require('must');

var _must2 = _interopRequireDefault(_must);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cleanUpWhenDone(tmpDir) {
  return function (promise) {
    return promise.then(function () {
      tmpDir.removeCallback();
    }, function (err) {
      tmpDir.removeCallback();
      throw err;
    });
  };
}

function statOf(file) {
  return new Promise(function (resolve, reject) {
    _fsExtra2.default.stat(file, function (err, stats) {
      if (err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  });
}

describe('statOf', function () {

  it('gives correct information', function () {
    return statOf(__filename).then(function (stats) {
      (0, _must2.default)(stats.size).to.be.gt(0);
    });
  });

  it('can result in an error if file not exists', function () {
    return statOf('non-existant').catch(function (err) {
      (0, _must2.default)(err).not.to.be.null();
    });
  });
});