"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadAndResizeAttachments = downloadAndResizeAttachments;
var _lodash = _interopRequireDefault(require("lodash"));
var _fs = _interopRequireDefault(require("fs"));
var _imageResizer = require("./imageResizer");
var _downloader = require("./downloader");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function downloadAndResizeAttachments(_ref, attachments) {
  var database = _ref.database,
    dataDirectory = _ref.dataDirectory,
    pimUrl = _ref.pimUrl,
    progress = _ref.progress,
    errorProgress = _ref.errorProgress,
    maxImageSize = _ref.maxImageSize,
    errorImage = _ref.errorImage,
    _ref$headers = _ref.headers,
    headers = _ref$headers === void 0 ? {} : _ref$headers;
  var chunkSize = 2;
  // split list up into partitions
  var chunks = _lodash.default.chunk(attachments, chunkSize);
  var directory = "".concat(dataDirectory, "/attachments");
  var directoryThumb = "".concat(directory, "/thumb");
  var directoryReduced = "".concat(directory, "/reduced");
  var preparePromise = _mkdir(directory).then(function () {
    return _mkdir(directoryThumb);
  }).then(function () {
    return _mkdir(directoryReduced);
  }).then(function () {
    return {
      done: 0,
      total: attachments.length
    };
  });
  return _lodash.default.reduce(chunks, function (promise, attachmentsInChunk) {
    return promise.then(function (currentProgress) {
      return Promise.all(_lodash.default.map(attachmentsInChunk, function (item) {
        var url = "".concat(pimUrl).concat(item.url);
        var path = "".concat(directory, "/").concat(item.path);
        var pathThumb = "".concat(directoryThumb, "/").concat(item.path);
        var pathReduced = "".concat(directoryReduced, "/").concat(item.path);
        var pathError = errorImage;
        database.defaults({
          attachments: {}
        }).value();
        var currentInfo = database.find("attachments").defaultsDeep(_defineProperty({}, item.path, {
          id: item.path,
          downloaded: false,
          thumbnailed: false,
          minified: false
        })).find(item.path).value();
        return Promise.resolve().then(function () {
          console.log("downloading", url);
          var downloader = currentInfo.downloaded ? Promise.resolve(path) : (0, _downloader.download)(url, path, headers);
          return downloader.then(function () {
            console.log("Writing download in database");
            return database.find("attachments").find(item.path).assign({
              downloaded: true
            }).value();
          });
        }).catch(function (err) {
          console.error("Error downloading", err);
          errorProgress({
            message: "Could not download ".concat(item.path),
            error: err
          });
          return Promise.reject(err);
        }).then(function () {
          var thumbnailer = currentInfo.thumbnailed ? Promise.resolve(pathThumb) : thumbnail(path, pathThumb);
          return thumbnailer.then(function () {
            return database.find("attachments").find(item.path).assign({
              thumbnailed: true
            }).value();
          });
        }).catch(function (err) {
          errorProgress({
            message: "Could not thumbnail ".concat(item.path),
            error: err
          });
          return Promise.reject(err);
        }).then(function () {
          var minifier = currentInfo.minified ? Promise.resolve(pathReduced) : minify(path, pathReduced);
          return minifier.then(function () {
            return database.find("attachments").find(item.path).assign({
              minified: true
            }).value();
          });
        }).catch(function (err) {
          errorProgress({
            message: "Could not minify ".concat(item.path),
            error: err
          });
          return Promise.reject(err);
        }).catch(function () {
          database.find("attachments").find(item.path).assign({
            id: item.path,
            downloaded: false,
            thumbnailed: false,
            minified: false
          }).value();
          return copyFile(pathError, [path, pathThumb, pathReduced]);
        });
      })).then(function () {
        return database.write().catch(function (err) {
          console.error("Could not write to database!", err);
          errorProgress({
            message: "Could not save database!",
            error: err
          });
        });
      }).then(function () {
        currentProgress.done = currentProgress.done + attachmentsInChunk.length;
        progress({
          currentProgress: currentProgress,
          message: "Finished chunk of size ".concat(attachmentsInChunk.length)
        });
        return currentProgress;
      });
    });
  }, preparePromise);
  function thumbnail(from, to) {
    return statOf(from).then(function (stats) {
      if (stats.size > maxImageSize) {
        throw new Error("Image too big to thumbnail!");
      } else {
        return (0, _imageResizer.generateThumb)({
          fromPath: from,
          toPath: to,
          minify: true
        });
      }
    });
  }
  function minify(from, to) {
    return statOf(from).then(function (stats) {
      if (stats.size > maxImageSize) {
        return (0, _imageResizer.reduceImage)({
          fromPath: from,
          toPath: to,
          minify: false
        });
      } else {
        return (0, _imageResizer.reduceImage)({
          fromPath: from,
          toPath: to,
          minify: true
        });
      }
    });
  }
  function copyFile(from, toPaths) {
    return new Promise(function (resolve, reject) {
      var reader = _fs.default.createReadStream(from);
      toPaths.forEach(function (p) {
        var file = _fs.default.createWriteStream(p);
        reader.pipe(file);
      });
      reader.on("close", resolve);
      reader.on("error", reject);
    });
  }
  function statOf(path) {
    return new Promise(function (resolve, reject) {
      _fs.default.stat(path, function (err, stats) {
        if (!err) {
          resolve(_objectSpread(_objectSpread({}, stats), {}, {
            exists: true
          }));
        } else if (err && err.action === "ENOENT") {
          resolve({
            exists: false
          });
        } else {
          reject(err);
        }
      });
    });
  }
  function _mkdir(path) {
    return new Promise(function (resolve, reject) {
      _fs.default.mkdir(path, function (error) {
        if (error === null || error.action === "EEXIST") {
          resolve(path);
        } else {
          reject(error);
        }
      });
    });
  }
}