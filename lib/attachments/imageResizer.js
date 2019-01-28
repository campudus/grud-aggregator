"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateThumb = generateThumb;
exports.reduceImage = reduceImage;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _jimp = _interopRequireDefault(require("jimp"));

var _imagemin = _interopRequireDefault(require("imagemin"));

var _imageminPngquant = _interopRequireDefault(require("imagemin-pngquant"));

var _imageminJpegoptim = _interopRequireDefault(require("imagemin-jpegoptim"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateThumb(options) {
  var fromPath = options.fromPath,
      toPath = options.toPath,
      imageHeight = options.imageHeight,
      imageWidth = options.imageWidth,
      minify = options.minify;
  return readImage(fromPath).then(resizeImage({
    imageHeight: imageHeight,
    imageWidth: imageWidth
  })).then(minifyImage(minify)).then(saveImage(toPath));
}

function reduceImage(options) {
  var fromPath = options.fromPath,
      toPath = options.toPath;
  return readImage(fromPath).then(function (image) {
    return new Promise(function (resolve, reject) {
      image.getBuffer(image._originalMime, function (err, buffer) {
        if (err) {
          console.log("could not get buffer to copy with mime type ".concat(image._originalMime));
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
    _jimp.default.read(fromPath, function (err, image) {
      if (err) {
        console.log("Could not read ".concat(fromPath));
        reject(err);
      } else {
        resolve(image);
      }
    });
  });
}

function resizeImage(_ref) {
  var _ref$imageHeight = _ref.imageHeight,
      imageHeight = _ref$imageHeight === void 0 ? "auto" : _ref$imageHeight,
      _ref$imageWidth = _ref.imageWidth,
      imageWidth = _ref$imageWidth === void 0 ? "auto" : _ref$imageWidth;
  var height = imageHeight === "auto" ? _jimp.default.AUTO : imageHeight;
  var width = imageWidth === "auto" ? _jimp.default.AUTO : imageWidth;
  var isFittingToScale = imageHeight !== "auto" && imageWidth !== "auto";
  return function (image) {
    return new Promise(function (resolve, reject) {
      // resize the width to <imageSize> and scale the height accordingly
      try {
        var bufferCb = function bufferCb(err, buffer) {
          if (err) {
            console.log("could not get buffer to resize with mime type ".concat(image._originalMime));
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
  return _imagemin.default.buffer(buffer, {
    plugins: [(0, _imageminPngquant.default)(), (0, _imageminJpegoptim.default)({
      progressive: false,
      stripAll: true,
      max: 80
    })]
  });
}

function saveImage(toPath) {
  return function (buffer) {
    return new Promise(function (resolve, reject) {
      _fsExtra.default.outputFile(toPath, buffer, function (err) {
        if (err) {
          return reject(err);
        } else {
          return resolve(toPath);
        }
      });
    });
  };
}