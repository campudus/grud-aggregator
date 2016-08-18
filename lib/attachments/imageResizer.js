'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateThumb = generateThumb;
exports.reduceImage = reduceImage;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _jimp = require('jimp');

var _jimp2 = _interopRequireDefault(_jimp);

var _imagemin = require('imagemin');

var _imagemin2 = _interopRequireDefault(_imagemin);

var _imageminPngquant = require('imagemin-pngquant');

var _imageminPngquant2 = _interopRequireDefault(_imageminPngquant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateThumb(options) {
  var fromPath = options.fromPath;
  var toPath = options.toPath;
  var imageHeight = options.imageHeight;
  var imageWidth = options.imageWidth;
  var minify = options.minify;

  return readImage(fromPath).then(resizeImage({ imageHeight: imageHeight, imageWidth: imageWidth })).then(minifyImage(minify)).then(saveImage(toPath));
}

function reduceImage(options) {
  var fromPath = options.fromPath;
  var toPath = options.toPath;

  return readImage(fromPath).then(function (image) {
    return new Promise(function (resolve, reject) {
      image.getBuffer(image._originalMime, function (err, buffer) {
        if (err) {
          console.log('could not get buffer to copy with mime type ' + image._originalMime);
          reject(err);
        } else {
          resolve(buffer);
        }
      });
    });
  }).then(minifyImage(true)).then(saveImage(toPath));
}

function readImage(fromPath) {
  return new Promise(function (resolve, reject) {
    _jimp2.default.read(fromPath, function (err, image) {
      if (err) {
        console.log('Could not read ' + fromPath);
        reject(err);
      } else {
        resolve(image);
      }
    });
  });
}

function resizeImage(_ref) {
  var _ref$imageHeight = _ref.imageHeight;
  var imageHeight = _ref$imageHeight === undefined ? 'auto' : _ref$imageHeight;
  var _ref$imageWidth = _ref.imageWidth;
  var imageWidth = _ref$imageWidth === undefined ? 'auto' : _ref$imageWidth;

  var height = imageHeight === 'auto' ? _jimp2.default.AUTO : imageHeight;
  var width = imageWidth === 'auto' ? _jimp2.default.AUTO : imageWidth;
  var isFittingToScale = imageHeight !== 'auto' && imageWidth !== 'auto';
  return function (image) {
    return new Promise(function (resolve, reject) {
      // resize the width to <imageSize> and scale the height accordingly
      try {
        var bufferCb = function bufferCb(err, buffer) {
          if (err) {
            console.log('could not get buffer to resize with mime type ' + image._originalMime);
            reject(err);
          } else {
            resolve(buffer);
          }
        };
        if (isFittingToScale) {
          image.contain(width, height).getBuffer(image._originalMime, bufferCb);
        } else {
          image.resize(width, height).getBuffer(image._originalMime, bufferCb);
        }
      } catch (e) {
        reject(e);
      }
    });
  };
}

function minifyImage(minify) {
  return function (buffer) {
    if (minify) {
      return minifyImageBuffer(buffer);
    } else {
      return buffer;
    }
  };
}

function minifyImageBuffer(buffer) {
  return _imagemin2.default.buffer(buffer, {
    plugins: [(0, _imageminPngquant2.default)()]
  });
}

function saveImage(toPath) {
  return function (buffer) {
    return new Promise(function (resolve, reject) {
      _fsExtra2.default.outputFile(toPath, buffer, function (err) {
        if (err) {
          return reject(err);
        } else {
          return resolve(toPath);
        }
      });
    });
  };
}