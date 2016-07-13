'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEntitiesOfTable = getEntitiesOfTable;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _pimApi = require('./pimApi');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getEntitiesOfTable(tableName, options) {
  var pimUrl = options.pimUrl;


  var promises = {};
  var tables = {};

  return (0, _pimApi.getTablesByNames)(pimUrl, tableName).then(function (tablesFromPim) {
    console.log('Tables from pim', tablesFromPim);
    return Promise.all(_lodash2.default.map(tablesFromPim, function (table) {
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