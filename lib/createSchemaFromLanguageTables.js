"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSchemaFromLanguageTables = createSchemaFromLanguageTables;
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function createSchemaFromLanguageTables() {
  for (var _len = arguments.length, fallbackLanguages = new Array(_len), _key = 0; _key < _len; _key++) {
    fallbackLanguages[_key] = arguments[_key];
  }
  // data is {"de":{...},"en":{...}, "en-US":{...}}
  return function (data) {
    return _lodash.default.mapValues(data, function (tables) {
      var json = {};
      json.tables = _lodash.default.transform(tables, function (result, table, tableId) {
        result[table.name] = table.displayName || getFromFallback(data, [tableId, "displayName"]);
      }, {});
      json.columns = _lodash.default.transform(tables, function (result, table, tableId) {
        result[table.name] = _lodash.default.transform(table.columns, function (result, column, columnIndex) {
          result[column.name] = column.displayName || getFromFallback(data, [tableId, "columns", columnIndex, "displayName"]);
        }, {});
      }, {});
      return json;
    });
  };
  function getFromFallback(data, path) {
    var firstPossibleFallback = _lodash.default.find(fallbackLanguages, function (lang) {
      return _lodash.default.has(data, [lang].concat(path));
    });
    return _lodash.default.get(data, [firstPossibleFallback].concat(path));
  }
}