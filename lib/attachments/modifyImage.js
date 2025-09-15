"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modifyImages = modifyImages;
var _path = _interopRequireDefault(require("path"));
var _child_process = require("child_process");
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function modifyImages() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      chunkSize: 1,
      imageWidth: "auto",
      imageHeight: "auto",
      minify: false,
      trim: false,
      dataDirectory: "out",
      outPath: "out",
      onError: _lodash.default.noop,
      progress: function progress() {}
    },
    _ref$chunkSize = _ref.chunkSize,
    chunkSize = _ref$chunkSize === void 0 ? 1 : _ref$chunkSize,
    _ref$imageWidth = _ref.imageWidth,
    imageWidth = _ref$imageWidth === void 0 ? "auto" : _ref$imageWidth,
    _ref$imageHeight = _ref.imageHeight,
    imageHeight = _ref$imageHeight === void 0 ? "auto" : _ref$imageHeight,
    database = _ref.database,
    key = _ref.key,
    _ref$minify = _ref.minify,
    minify = _ref$minify === void 0 ? false : _ref$minify,
    _ref$trim = _ref.trim,
    trim = _ref$trim === void 0 ? false : _ref$trim,
    _ref$outPath = _ref.outPath,
    outPath = _ref$outPath === void 0 ? "out" : _ref$outPath,
    _ref$onError = _ref.onError,
    onError = _ref$onError === void 0 ? _lodash.default.noop : _ref$onError,
    _ref$progress = _ref.progress,
    progress = _ref$progress === void 0 ? function () {} : _ref$progress;
  if (_lodash.default.isEmpty(key)) {
    throw new Error("Missing key option");
  }
  if (_lodash.default.isEmpty(database)) {
    throw new Error("Missing database option");
  }
  return function (images) {
    if (!_lodash.default.isArray(images)) {
      throw new Error("Expected Array as images");
    }
    var inputs = _lodash.default.map(images, function (image) {
      return {
        fromPath: image,
        toPath: "".concat(outPath, "/").concat(_path.default.basename(image))
      };
    });
    var resize = imageWidth !== "auto" || imageHeight !== "auto";
    var steps = inputs.length;
    return Promise.resolve({
      currentStep: 0,
      files: inputs
    }).then(function (stepAndFiles) {
      progress({
        error: false,
        message: "Modifying images",
        currentStep: stepAndFiles.currentStep,
        steps: steps
      });
      return stepAndFiles;
    }).then(function (stepAndAllFiles) {
      // modifyImage can resize AND minify AND trim at the same time
      if (!resize && !minify && !trim) {
        return stepAndAllFiles;
      }
      var chunkedFiles = _lodash.default.chunk(stepAndAllFiles.files, chunkSize);
      var stepAndFiles = Promise.resolve({
        currentStep: stepAndAllFiles.currentStep,
        files: []
      });
      return _lodash.default.reduce(chunkedFiles, function (promise, chunkFiles) {
        return promise.then(function (stepAndFiles) {
          var currentStep = stepAndFiles.currentStep,
            previousFiles = stepAndFiles.files;
          var actions = [].concat(_toConsumableArray(resize ? ["resizing"] : []), _toConsumableArray(minify ? ["minifying"] : []), _toConsumableArray(trim ? ["trimming"] : []));
          var formatter = new Intl.ListFormat("en", {
            style: "long",
            type: "conjunction"
          });
          var doing = _lodash.default.upperFirst(formatter.format(actions));
          var multiple = chunkSize > 1;
          progress({
            error: false,
            message: "".concat(doing, " image").concat(multiple ? "s" : "", " ").concat(_lodash.default.map(chunkFiles, function (file) {
              return file.fromPath;
            }).join(", ")),
            currentStep: currentStep,
            steps: steps
          });
          var numFiles = _lodash.default.size(chunkFiles);
          var filesInChunkWithStatus = _lodash.default.map(chunkFiles, function (file) {
            var fromPath = file.fromPath,
              toPath = file.toPath;
            var isDone = !!database.find(_path.default.basename(toPath), key);
            return {
              done: isDone,
              fromPath: fromPath,
              toPath: toPath
            };
          });
          return Promise.all(_lodash.default.map(filesInChunkWithStatus, function (file) {
            var fromPath = file.fromPath,
              toPath = file.toPath;
            if (file.done) {
              progress({
                error: false,
                message: "Already modified image ".concat(toPath),
                currentStep: currentStep,
                steps: steps
              });
              return Promise.resolve(file);
            }
            var handleError = function handleError(error) {
              progress({
                error: error,
                message: "Could not modify image ".concat(fromPath),
                currentStep: currentStep,
                steps: steps
              });
              if (_lodash.default.isFunction(onError)) {
                onError(error, fromPath);
              }
              return _objectSpread(_objectSpread({}, file), {}, {
                error: error
              });
            };
            var modificationArguments = [fromPath, toPath, minify, trim];
            if (resize) {
              modificationArguments.push(imageWidth, imageHeight);
            }
            return startImageModificationProcess(modificationArguments).then(function () {
              return file;
            }).catch(handleError);
          })).then(function (processedFiles) {
            var successfullyProcessedFiles = _lodash.default.reject(processedFiles, "error");
            return Promise.all(_lodash.default.map(successfullyProcessedFiles, function (file) {
              return database.insert(_path.default.basename(file.toPath), key);
            })).then(function () {
              return database.save();
            }).then(function () {
              var currentFiles = _lodash.default.map(successfullyProcessedFiles, function (file) {
                return _lodash.default.omit(file, "done");
              });
              return {
                files: previousFiles.concat(currentFiles),
                currentStep: currentStep + numFiles
              };
            });
          });
        });
      }, stepAndFiles);
    }).then(function (stepAndFiles) {
      progress({
        error: false,
        message: "Modified images",
        currentStep: steps,
        steps: steps
      });
      var modifiedFiles = _lodash.default.map(stepAndFiles.files, function (file) {
        var toPath = file.toPath;
        database.insert(_path.default.basename(toPath), key);
        return toPath;
      });
      return database.save().then(function () {
        return modifiedFiles;
      });
    });
  };
}
function startImageModificationProcess(args) {
  return new Promise(function (resolve, reject) {
    var cp = (0, _child_process.fork)("".concat(__dirname, "/modifyImageProcess.js"), args);
    cp.on("close", function (code) {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error("Could not modify image with args"));
      }
    });
  });
}