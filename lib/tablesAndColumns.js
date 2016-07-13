'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSchemaFromLanguageTables = createSchemaFromLanguageTables;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSchemaFromLanguageTables() {
  for (var _len = arguments.length, fallbackLanguages = Array(_len), _key = 0; _key < _len; _key++) {
    fallbackLanguages[_key] = arguments[_key];
  }

  // data is {'de':{...},'en':{...}, 'en-US':{...}}
  return function (data) {
    return _lodash2.default.mapValues(data, function (tables) {
      var json = {};
      json.tables = _lodash2.default.transform(tables, function (result, table, tableId) {
        result[table.name] = table.displayName || getFromFallback(data, [tableId, 'displayName']);
      }, {});
      json.columns = _lodash2.default.transform(tables, function (result, table, tableId) {
        result[table.name] = _lodash2.default.transform(table.columns, function (result, column, columnIndex) {
          result[column.name] = column.displayName || getFromFallback(data, [tableId, 'columns', columnIndex, 'displayName']);
        }, {});
      }, {});
      return json;
    });
  };

  function getFromFallback(data, path) {
    var firstPossibleFallback = _lodash2.default.find(fallbackLanguages, function (lang) {
      return _lodash2.default.has(data, [lang].concat(path));
    });
    return _lodash2.default.get(data, [firstPossibleFallback].concat(path));
  }
}