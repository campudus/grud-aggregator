"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateThumb = generateThumb;
exports.reduceImage = reduceImage;

var _sharp = _interopRequireDefault(require("sharp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateThumb(options) {
  var fromPath = options.fromPath,
      toPath = options.toPath,
      imageHeight = options.imageHeight,
      imageWidth = options.imageWidth,
      _options$minify = options.minify,
      minify = _options$minify === void 0 ? false : _options$minify;
  return getTransformer({
    fromPath: fromPath,
    resize: true,
    imageHeight: imageHeight,
    imageWidth: imageWidth,
    minify: minify
  }).then(function (sharp) {
    return sharp.toFile(toPath);
  });
}

function reduceImage(options) {
  var fromPath = options.fromPath,
      toPath = options.toPath;
  return getTransformer({
    fromPath: fromPath,
    resize: false,
    minify: true
  }).then(function (sharp) {
    return sharp.toFile(toPath);
  });
}

function getTransformer(_ref) {
  var fromPath = _ref.fromPath,
      resize = _ref.resize,
      imageHeight = _ref.imageHeight,
      imageWidth = _ref.imageWidth,
      minify = _ref.minify;
  return new Promise(function (resolve, reject) {
    try {
      var transformer = (0, _sharp.default)(fromPath);

      if (resize) {
        transformer.resize({
          width: imageWidth,
          height: imageHeight,
          fit: "contain",
          background: {
            r: 0,
            g: 0,
            b: 0,
            alpha: 0
          }
        });
      }

      transformer.jpeg({
        quality: minify ? 80 : 95,
        chromaSubsampling: minify ? "4:2:0" : "4:4:4",
        force: false
      }).png({
        force: false,
        palette: minify,
        compressionLevel: 9,
        adaptiveFiltering: true
      });
      resolve(transformer);
    } catch (err) {
      reject(err);
    }
  });
}