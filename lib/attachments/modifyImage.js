'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.modifyImages = modifyImages;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _imageResizer = require('./imageResizer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function modifyImages() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {
    imageWidth: 0,
    minify: false,
    dataDirectory: 'out',
    outPath: 'out',
    progress: function progress() {}
  } : arguments[0];

  var _ref$imageWidth = _ref.imageWidth;
  var imageWidth = _ref$imageWidth === undefined ? 0 : _ref$imageWidth;
  var database = _ref.database;
  var key = _ref.key;
  var _ref$minify = _ref.minify;
  var minify = _ref$minify === undefined ? false : _ref$minify;
  var _ref$outPath = _ref.outPath;
  var outPath = _ref$outPath === undefined ? 'out' : _ref$outPath;
  var _ref$progress = _ref.progress;
  var progress = _ref$progress === undefined ? function () {} : _ref$progress;

  if (_lodash2.default.isEmpty(key)) {
    throw new Error('Missing key option');
  }

  if (_lodash2.default.isEmpty(database)) {
    throw new Error('Missing database option');
  }

  return function (images) {
    if (!_lodash2.default.isArray(images)) {
      throw new Error('Expected Array as images');
    }

    var inputs = _lodash2.default.map(images, function (i) {
      return {
        fromPath: i,
        toPath: outPath + '/' + _path2.default.basename(i)
      };
    });
    var resize = imageWidth > 0;
    var steps = inputs.length * ((resize ? 1 : 0) + (minify ? 1 : 0));

    return Promise.resolve({ currentStep: 0, files: inputs }).then(function (stepAndFiles) {
      progress('Modifying images', stepAndFiles.currentStep, steps);
      return stepAndFiles;
    }).then(function (stepAndFiles) {
      if (resize) {
        return _lodash2.default.reduce(stepAndFiles.files, function (promise, file) {
          return promise.then(function (_ref2) {
            var currentStep = _ref2.currentStep;
            var files = _ref2.files;

            progress('Resizing image ' + file.fromPath, currentStep, steps);
            var to = file.toPath;
            var result = {
              files: files.concat([{
                fromPath: to,
                toPath: to
              }]),
              currentStep: currentStep + 1
            };

            if (database.find(_path2.default.basename(to), key)) {
              return result;
            } else {
              return (0, _imageResizer.generateThumb)(_extends({}, file, {
                imageWidth: imageWidth
              })).then(function () {
                return result;
              });
            }
          });
        }, Promise.resolve({ currentStep: stepAndFiles.currentStep, files: [] }));
      } else {
        return stepAndFiles;
      }
    }).then(function (stepAndFiles) {
      if (minify) {
        return _lodash2.default.reduce(stepAndFiles.files, function (promise, file) {
          return promise.then(function (_ref3) {
            var currentStep = _ref3.currentStep;
            var files = _ref3.files;

            progress('Minifying image ' + file.fromPath, currentStep, steps);
            var to = file.toPath;
            var result = {
              files: files.concat([{
                fromPath: to,
                toPath: to
              }]),
              currentStep: currentStep + 1
            };

            if (database.find(_path2.default.basename(to), key)) {
              return result;
            } else {
              return (0, _imageResizer.reduceImage)(_extends({}, file)).then(function () {
                return result;
              });
            }
          });
        }, Promise.resolve({ currentStep: stepAndFiles.currentStep, files: [] }));
      } else {
        return stepAndFiles;
      }
    }).then(function (stepAndFiles) {
      progress('Modified images', steps, steps);
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