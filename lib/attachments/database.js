"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Database = void 0;
var _lowdb = _interopRequireDefault(require("lowdb"));
var _fileAsync = _interopRequireDefault(require("lowdb/lib/file-async"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Database = exports.Database = /*#__PURE__*/function () {
  function Database(databaseFile) {
    _classCallCheck(this, Database);
    this.database = (0, _lowdb.default)(databaseFile, {
      storage: _fileAsync.default,
      writeOnChange: false
    });
  }
  return _createClass(Database, [{
    key: "find",
    value: function find(attachment, key) {
      return this.database.defaults({
        attachments: {}
      }).get("attachments").defaultsDeep(_defineProperty({}, attachment, _defineProperty({
        "id": attachment
      }, key, false))).get(attachment).get(key).value();
    }
  }, {
    key: "insert",
    value: function insert(attachment, key) {
      this.database.defaults({
        attachments: {}
      }).get("attachments").defaultsDeep(_defineProperty({}, attachment, _defineProperty({
        "id": attachment
      }, key, false))).get(attachment).assign(_defineProperty({}, key, true)).value();
    }
  }, {
    key: "save",
    value: function save() {
      return this.database.write();
    }
  }]);
}();