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
  var downloadPath = _ref.downloadPath;


  if (_lodash2.default.isEmpty(database)) {
    throw new Error('Missing database option');
  }

  if (_lodash2.default.isEmpty(pimUrl)) {
    throw new Error('Missing pimUrl option');
  }

  if (_lodash2.default.isEmpty(downloadPath)) {
    throw new Error('Missing downloadPath option');
  }

  return function (attachments) {
    return _lodash2.default.reduce(attachments, function (promise, attachment) {
      return promise.then(function (list) {
        if (_lodash2.default.isEmpty(attachment.url) || _lodash2.default.isEmpty(attachment.path)) {
          return Promise.reject(new Error('Expected array of {url, path} mappings.'));
        } else {
          var _ret = function () {
            var from = '' + pimUrl + attachment.url;
            var to = downloadPath + '/' + attachment.path;
            if (database.find(_path2.default.basename(to), 'downloaded')) {
              return {
                v: Promise.resolve(list.concat([to]))
              };
            } else {
              return {
                v: download(from, to).then(function (to) {
                  database.insert(_path2.default.basename(to), 'downloaded');
                  return database.save();
                }).then(function () {
                  return list.concat([to]);
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