"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modifyImages = modifyImages;

var _path = _interopRequireDefault(require("path"));

var _child_process = require("child_process");

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function modifyImages() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    chunkSize: 1,
    imageWidth: "auto",
    imageHeight: "auto",
    minify: false,
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
      // resize can resize AND minify at the same time
      if (!resize && !minify) {
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
          var doing = resize && minify ? "Resizing and minifying" : resize ? "Resizing" : "Minifying";
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
            /* resize (and maybe minify) */


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

              return _objectSpread({}, file, {
                error: error
              });
            };

            var modificationArguments = [fromPath, toPath, minify];

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