"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanUpWhenDone = cleanUpWhenDone;
exports.statOf = statOf;
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _must = _interopRequireDefault(require("must"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
    _fsExtra.default.stat(file, function (err, stats) {
      if (err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  });
}
describe("statOf", function () {
  it("gives correct information", function () {
    return statOf(__filename).then(function (stats) {
      (0, _must.default)(stats.size).to.be.gt(0);
    });
  });
  it("can result in an error if file not exists", function () {
    return statOf("non-existant").catch(function (err) {
      (0, _must.default)(err).not.to.be.null();
    });
  });
});