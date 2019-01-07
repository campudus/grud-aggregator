"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modifyImages = modifyImages;

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _child_process = require("child_process");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function modifyImages() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    chunkSize: 1,
    imageWidth: "auto",
    imageHeight: "auto",
    minify: false,
    dataDirectory: "out",
    outPath: "out",
    onError: _lodash2.default.noop,
    progress: function progress() {}
  },
      _ref$chunkSize = _ref.chunkSize,
      chunkSize = _ref$chunkSize === undefined ? 1 : _ref$chunkSize,
      _ref$imageWidth = _ref.imageWidth,
      imageWidth = _ref$imageWidth === undefined ? "auto" : _ref$imageWidth,
      _ref$imageHeight = _ref.imageHeight,
      imageHeight = _ref$imageHeight === undefined ? "auto" : _ref$imageHeight,
      database = _ref.database,
      key = _ref.key,
      _ref$minify = _ref.minify,
      minify = _ref$minify === undefined ? false : _ref$minify,
      _ref$outPath = _ref.outPath,
      outPath = _ref$outPath === undefined ? "out" : _ref$outPath,
      _ref$onError = _ref.onError,
      onError = _ref$onError === undefined ? _lodash2.default.noop : _ref$onError,
      _ref$progress = _ref.progress,
      progress = _ref$progress === undefined ? function () {} : _ref$progress;

  if (_lodash2.default.isEmpty(key)) {
    throw new Error("Missing key option");
  }

  if (_lodash2.default.isEmpty(database)) {
    throw new Error("Missing database option");
  }

  return function (images) {
    if (!_lodash2.default.isArray(images)) {
      throw new Error("Expected Array as images");
    }

    var inputs = _lodash2.default.map(images, function (image) {
      return {
        fromPath: image,
        toPath: outPath + "/" + _path2.default.basename(image)
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
      if (resize || minify) {
        // resize can resize AND minify at the same time
        var chunkedFiles = _lodash2.default.chunk(stepAndAllFiles.files, chunkSize);

        return _lodash2.default.reduce(chunkedFiles, function (promise, chunkFiles) {
          return promise.then(function (stepAndFiles) {
            var currentStep = stepAndFiles.currentStep,
                previousFiles = stepAndFiles.files;


            var doing = resize && minify ? "Resizing and minifying" : resize ? "Resizing" : "Minifying";
            var multiple = chunkSize > 1;

            progress({
              error: false,
              message: doing + " image" + (multiple ? "s" : "") + " " + _lodash2.default.map(chunkFiles, function (file) {
                return file.fromPath;
              }).join(", "),
              currentStep: currentStep,
              steps: steps
            });

            var filesInChunkWithStatus = _lodash2.default.map(chunkFiles, function (file) {
              var fromPath = file.fromPath,
                  toPath = file.toPath;


              if (database.find(_path2.default.basename(toPath), key)) {
                return {
                  done: true,
                  fromPath: fromPath,
                  toPath: toPath
                };
              } else {
                return {
                  done: false,
                  fromPath: fromPath,
                  toPath: toPath
                };
              }
            });

            return Promise.all(_lodash2.default.map(filesInChunkWithStatus, function (file) {
              if (file.done) {
                progress({
                  error: false,
                  message: "Already modified image " + file.toPath,
                  currentStep: currentStep,
                  steps: steps
                });

                return Promise.resolve(file);
              }

              var handleError = function handleError(error) {
                progress({
                  error: error,
                  message: "Could not modify image " + file.fromPath,
                  currentStep: currentStep,
                  steps: steps
                });

                _lodash2.default.attempt(onError, error, file.fromPath);

                return null;
              };

              /* resize (and maybe minify) */

              if (resize) {
                return startImageModificationProcess([file.fromPath, file.toPath, minify, imageWidth, imageHeight]).then(function () {
                  return file;
                }).catch(handleError);
              }

              /* only minify */

              return startImageModificationProcess([file.fromPath, file.toPath, minify]).then(function () {
                return file;
              }).catch(handleError);
            })).then(function (processedFiles) {
              var numProcessedFiles = _lodash2.default.size(processedFiles);
              var successfullyProcessedFiles = _lodash2.default.compact(processedFiles);

              return Promise.all(_lodash2.default.map(successfullyProcessedFiles, function (file) {
                return database.insert(_path2.default.basename(file.toPath), key);
              })).then(function () {
                return database.save();
              }).then(function () {
                var currentFiles = _lodash2.default.map(successfullyProcessedFiles, function (file) {
                  return _lodash2.default.omit(file, "done");
                });

                return {
                  files: previousFiles.concat(currentFiles),
                  currentStep: currentStep + numProcessedFiles
                };
              });
            });
          });
        }, Promise.resolve({
          currentStep: stepAndAllFiles.currentStep,
          files: []
        }));
      } else {
        return stepAndAllFiles;
      }
    }).then(function (stepAndFiles) {
      progress({
        error: false,
        message: "Modified images",
        currentStep: steps,
        steps: steps
      });

      var modifiedFiles = _lodash2.default.map(stepAndFiles.files, function (file) {
        database.insert(_path2.default.basename(file.toPath), key);
        return file.toPath;
      });

      return database.save().then(function () {
        return modifiedFiles;
      });
    });
  };
}

function startImageModificationProcess(args) {
  return new Promise(function (resolve, reject) {
    var cp = (0, _child_process.fork)(__dirname + "/modifyImageProcess.js", args);

    cp.on("close", function (code) {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error("Could not modify image with args"));
      }
    });
  });
}