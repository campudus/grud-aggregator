"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Database = void 0;

var _lowdb = _interopRequireDefault(require("lowdb"));

var _fileAsync = _interopRequireDefault(require("lowdb/lib/file-async"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Database =
/*#__PURE__*/
function () {
  function Database(databaseFile) {
    _classCallCheck(this, Database);

    this.database = (0, _lowdb.default)(databaseFile, {
      storage: _fileAsync.default,
      writeOnChange: false
    });
  }

  _createClass(Database, [{
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

  return Database;
}();

exports.Database = Database;