'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.downloader = downloader;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function downloader() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var database = _ref.database;
  var pimUrl = _ref.pimUrl;
  var progress = _ref.progress;
  var downloadPath = _ref.downloadPath;
  var errorImage = _ref.errorImage;


  if (_lodash2.default.isEmpty(database)) {
    throw new Error('Missing database option');
  }

  if (_lodash2.default.isEmpty(pimUrl)) {
    throw new Error('Missing pimUrl option');
  }

  if (_lodash2.default.isEmpty(downloadPath)) {
    throw new Error('Missing downloadPath option');
  }

  if (!_lodash2.default.isNil(progress) && !_lodash2.default.isFunction(progress)) {
    throw new Error('Option `progress` needs to be a function ({error, message, currentStep, steps}).');
  }

  if (!_lodash2.default.isNil(errorImage) && (!_lodash2.default.isString(errorImage) || _lodash2.default.isEmpty(errorImage))) {
    throw new Error('Option `errorImage` expects a path as string to a file');
  }

  return function (attachments) {
    var steps = attachments.length;
    var currentStep = 0;

    if (progress) {
      progress({
        error: false,
        message: 'Start downloading attachments',
        currentStep: currentStep,
        steps: steps
      });
    }

    return _lodash2.default.reduce(attachments, function (promise, attachment) {
      return promise.then(function (list) {
        if (_lodash2.default.isEmpty(attachment.url) || _lodash2.default.isEmpty(attachment.path)) {
          return Promise.reject(new Error('Expected array of {url, path} mappings.'));
        } else {
          var _ret = function () {
            var from = '' + pimUrl + attachment.url;
            var to = downloadPath + '/' + attachment.path;
            currentStep = currentStep + 1;
            if (database.find(_path2.default.basename(to), 'downloaded')) {
              if (progress) {
                progress({
                  error: false,
                  message: 'Already downloaded file ' + to,
                  currentStep: currentStep,
                  steps: steps
                });
              }
              return {
                v: Promise.resolve(list.concat([to]))
              };
            } else {
              return {
                v: download(from, to).then(function (to) {
                  database.insert(_path2.default.basename(to), 'downloaded');
                  return database.save();
                }).then(function () {
                  if (progress) {
                    progress({
                      error: false,
                      message: 'Downloaded ' + to + ' from ' + from,
                      currentStep: currentStep,
                      steps: steps
                    });
                  }
                  return list.concat([to]);
                }).catch(function (err) {
                  if (errorImage) {
                    return copyFile(errorImage, to).then(function () {
                      if (progress) {
                        progress({
                          error: true,
                          message: 'Downloaded ' + to + ' from ' + from,
                          currentStep: currentStep,
                          steps: steps
                        });
                      }
                      return list.concat([to]);
                    });
                  } else {
                    return Promise.reject(err);
                  }
                })
              };
            }
          }();

          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }
      });
    }, Promise.resolve([]));
  };
}

function copyFile(from, to) {
  return new Promise(function (resolve, reject) {
    _fsExtra2.default.copy(from, to, function (err) {
      if (err) {
        return reject(err);
      } else {
        return resolve();
      }
    });
  });
}

function download(url, path) {
  return new Promise(function (resolve, reject) {
    _http2.default.get(url, function (response) {
      if (response.statusCode === 200) {
        var file = _fsExtra2.default.createWriteStream(path);
        response.pipe(file).on('close', function () {
          resolve(path);
        }).on('error', unlinkOnError(reject));
      } else {
        console.error('Download of ' + url + ' failed with status code ' + response.statusCode);
        reject(new Error('Download of ' + url + ' failed with status code ' + response.statusCode + '.\n'));
      }
    }).on('error', unlinkOnError(reject));
  });

  function unlinkOnError(reject) {
    return function (err) {
      console.error('Could not download file.', url, path, err.message);
      _fsExtra2.default.unlink(path, function () {
        reject(err);
      });
    };
  }
}