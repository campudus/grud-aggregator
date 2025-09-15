"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateThumb = generateThumb;
exports.reduceImage = reduceImage;
exports.trimImage = trimImage;
var _sharp = _interopRequireDefault(require("sharp"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function generateThumb(options) {
  return modifyImage(_objectSpread(_objectSpread({}, options), {}, {
    resize: true
  }));
}
function reduceImage(options) {
  return modifyImage(_objectSpread(_objectSpread({}, options), {}, {
    resize: false,
    minify: true
  }));
}
function trimImage(options) {
  return modifyImage(_objectSpread(_objectSpread({}, options), {}, {
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