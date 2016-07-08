'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEntitiesOfTables = getEntitiesOfTables;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _pimApi = require('./pimApi');

var _translatedTables = require('./translatedTables');

var _translatedTables2 = _interopRequireDefault(_translatedTables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function getEntitiesOfTables(options) {
  for (var _len = arguments.length, tableNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    tableNames[_key - 1] = arguments[_key];
  }

  var pimUrl = options.pimUrl;
  var langtags = options.langtags;


  return getPimDataOfTables(pimUrl, tableNames).then(function (data) {
    return (0, _translatedTables2.default)(data, langtags);
  });

  function getPimDataOfTables(pimUrl, tableNames) {
    var promises = {};
    var tables = {};

    return _pimApi.getTablesByNames.apply(undefined, [pimUrl].concat(_toConsumableArray(tableNames))).then(function (tables) {
      return Promise.all(_lodash2.default.map(tables, function (table) {
        return getTableAndLinkedTablesAsPromise(table.id);
      }));
    }).then(function () {
      return tables;
    });

    function getTableAndLinkedTablesAsPromise(tableId) {
      if (!promises[tableId]) {
        var promiseOfLinkedTables = (0, _pimApi.getCompleteTable)(pimUrl, tableId).then(function (table) {
          tables[tableId] = table;
          return Promise.all(_lodash2.default.flatMap(table.columns, function (column) {
            if (!promises[column.toTable] && column.kind === 'link') {
              return [getTableAndLinkedTablesAsPromise(column.toTable)];
            } else {
              return [];
            }
          }));
        });

        promises[tableId] = promiseOfLinkedTables;

        return promiseOfLinkedTables;
      } else {
        return promises[tableId];
      }
    }
  }
}