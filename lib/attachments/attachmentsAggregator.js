'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.downloadAndResizeAttachments = downloadAndResizeAttachments;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _imageResizer = require('./imageResizer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function downloadAndResizeAttachments(_ref, attachments) {
  var database = _ref.database;
  var dataDirectory = _ref.dataDirectory;
  var pimUrl = _ref.pimUrl;
  var progress = _ref.progress;
  var errorProgress = _ref.errorProgress;
  var maxImageSize = _ref.maxImageSize;
  var errorImage = _ref.errorImage;


  var chunkSize = 2;
  // split list up into partitions
  var chunks = _lodash2.default.chunk(attachments, chunkSize);

  var directory = dataDirectory + '/attachments';
  var directoryThumb = directory + '/thumb';
  var directoryReduced = directory + '/reduced';

  var preparePromise = _mkdir(directory).then(function () {
    return _mkdir(directoryThumb);
  }).then(function () {
    return _mkdir(directoryReduced);
  }).then(function () {
    return { done: 0, total: attachments.length };
  });

  return _lodash2.default.reduce(chunks, function (promise, attachmentsInChunk) {
    return promise.then(function (currentProgress) {
      return Promise.all(_lodash2.default.map(attachmentsInChunk, function (item) {

        var url = '' + pimUrl + item.url;
        var path = directory + '/' + item.path;
        var pathThumb = directoryThumb + '/' + item.path;
        var pathReduced = directoryReduced + '/' + item.path;
        var pathError = errorImage;

        database.defaults({
          attachments: {}
        }).value();

        var currentInfo = database.find('attachments').defaultsDeep(_defineProperty({}, item.path, { id: item.path, downloaded: false, thumbnailed: false, minified: false })).find(item.path).value();

        return Promise.resolve().then(function () {
          console.log('downloading', url);
          var downloader = currentInfo.downloaded ? Promise.resolve(path) : download(url, path);
          return downloader.then(function () {
            console.log('Writing download in database');
            return database.find('attachments').find(item.path).assign({ downloaded: true }).value();
          });
        }).catch(function (err) {
          console.error('Error downloading', err);
          errorProgress({ message: 'Could not download ' + item.path, error: err });
          return Promise.reject(err);
        }).then(function () {
          var thumbnailer = currentInfo.thumbnailed ? Promise.resolve(pathThumb) : thumbnail(path, pathThumb);
          return thumbnailer.then(function () {
            return database.find('attachments').find(item.path).assign({ thumbnailed: true }).value();
          });
        }).catch(function (err) {
          errorProgress({ message: 'Could not thumbnail ' + item.path, error: err });
          return Promise.reject(err);
        }).then(function () {
          var minifier = currentInfo.minified ? Promise.resolve(pathReduced) : minify(path, pathReduced);
          return minifier.then(function () {
            return database.find('attachments').find(item.path).assign({ minified: true }).value();
          });
        }).catch(function (err) {
          errorProgress({ message: 'Could not minify ' + item.path, error: err });
          return Promise.reject(err);
        }).catch(function () {
          database.find('attachments').find(item.path).assign({ id: item.path, downloaded: false, thumbnailed: false, minified: false }).value();

          return copyFile(pathError, [path, pathThumb, pathReduced]);
        });
      })).then(function () {
        return database.write().catch(function (err) {
          console.error('Could not write to database!', err);
          errorProgress({ message: 'Could not save database!', error: err });
        });
      }).then(function () {
        currentProgress.done = currentProgress.done + attachmentsInChunk.length;
        progress({ currentProgress: currentProgress, message: 'Finished chunk of size ' + attachmentsInChunk.length });
        return currentProgress;
      });
    });
  }, preparePromise);

  function download(url, path) {
    return new Promise(function (resolve, reject) {
      _http2.default.find(url, function (response) {
        if (response.statusCode === 200) {
          var file = _fs2.default.createWriteStream(path);
          response.pipe(file);
        } else {
          console.error('Download of ' + url + ' failed with status code ' + response.statusCode);
          reject(new Error('Download of ' + url + ' failed with status code ' + response.statusCode + '.\n'));
        }
      }).on('close', function () {
        resolve(path);
      }).on('error', function (err) {
        console.error('Could not download file.', url, path, err.message);

        _fs2.default.unlink(path, function () {
          reject(err);
        });
      });
    });
  }

  function thumbnail(from, to) {
    return statOf(from).then(function (stats) {
      if (stats.size > maxImageSize) {
        throw new Error('Image too big to thumbnail!');
      } else {
        return (0, _imageResizer.generateThumb)({ fromPath: from, toPath: to, minify: true });
      }
    });
  }

  function minify(from, to) {
    return statOf(from).then(function (stats) {
      if (stats.size > maxImageSize) {
        return (0, _imageResizer.reduceImage)({ fromPath: from, toPath: to, minify: false });
      } else {
        return (0, _imageResizer.reduceImage)({ fromPath: from, toPath: to, minify: true });
      }
    });
  }

  function copyFile(from, toPaths) {
    return new Promise(function (resolve, reject) {
      var reader = _fs2.default.createReadStream(from);

      toPaths.forEach(function (p) {
        var file = _fs2.default.createWriteStream(p);
        reader.pipe(file);
      });

      reader.on('close', resolve);
      reader.on('error', reject);
    });
  }

  function statOf(path) {
    return new Promise(function (resolve, reject) {
      _fs2.default.stat(path, function (err, stats) {
        if (!err) {
          resolve(_extends({}, stats, { exists: true }));
        } else if (err && err.action === 'ENOENT') {
          resolve({ exists: false });
        } else {
          reject(err);
        }
      });
    });
  }

  function _mkdir(path) {
    return new Promise(function (resolve, reject) {
      _fs2.default.mkdir(path, function (error) {
        if (error === null || error.action === 'EEXIST') {
          resolve(path);
        } else {
          reject(error);
        }
      });
    });
  }
}