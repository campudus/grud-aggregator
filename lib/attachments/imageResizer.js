"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateThumb = generateThumb;
exports.reduceImage = reduceImage;
exports.trimImage = trimImage;

var _sharp = _interopRequireDefault(require("sharp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function generateThumb(options) {
  return modifyImage(_objectSpread({}, options, {
    resize: true
  }));
}

function reduceImage(options) {
  return modifyImage(_objectSpread({}, options, {
    resize: false,
    minify: true
  }));
}

function trimImage(options) {
  return modifyImage(_objectSpread({}, options, {
    resize: false,
    minify: false,
    trim: true
  }));
}

function modifyImage(_ref) {
  var fromPath = _ref.fromPath,
      toPath = _ref.toPath,
      resize = _ref.resize,
      imageHeight = _ref.imageHeight,
      imageWidth = _ref.imageWidth,
      minify = _ref.minify,
      trim = _ref.trim;
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

      if (trim) {
        transformer.trim();
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
  }).then(function (sharpObj) {
    return sharpObj.toFile(toPath);
  });
}