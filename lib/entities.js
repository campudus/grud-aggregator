"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEntitiesOfTable = getEntitiesOfTable;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _pimApi = require("./pimApi");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getEntitiesOfTable(tableName) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$disableFollo = options.disableFollow,
      disableFollow = _options$disableFollo === undefined ? [] : _options$disableFollo,
      pimUrl = options.pimUrl,
      _options$maxEntriesPe = options.maxEntriesPerRequest,
      maxEntriesPerRequest = _options$maxEntriesPe === undefined ? 500 : _options$maxEntriesPe,
      _options$headers = options.headers,
      headers = _options$headers === undefined ? {} : _options$headers;


  if (_lodash2.default.isNil(pimUrl)) {
    throw new Error("Missing option pimUrl");
  }

  if (!_lodash2.default.isString(pimUrl)) {
    throw new Error("Expecting pimUrl to be a string");
  }

  if (!_lodash2.default.isArray(disableFollow) || _lodash2.default.some(disableFollow, function (columns) {
    return !_lodash2.default.isArray(columns);
  })) {
    throw new Error("Expecting an array of columns as disableFollow");
  }

  if (!_lodash2.default.isInteger(maxEntriesPerRequest) || maxEntriesPerRequest <= 0) {
    throw new Error("Expecting maxEntriesPerRequest to be a positive integer greater than 0");
  }

  if (!_lodash2.default.isPlainObject(headers) || _lodash2.default.some(headers, function (value) {
    return !_lodash2.default.isString(value);
  })) {
    throw new Error("Expecting headers to be an object of key value pairs (string:string)");
  }

  var promises = {};
  var tables = {};

  return (0, _pimApi.getTablesByNames)({ pimUrl: pimUrl, headers: headers }, tableName).then(function (tablesFromPim) {
    return Promise.all(_lodash2.default.map(tablesFromPim, function (table) {
      return getTableAndLinkedTablesAsPromise(table.id, disableFollow, maxEntriesPerRequest);
    }));
  }).then(function () {
    return mapRowsOfTables(tables);
  });

  function getTableAndLinkedTablesAsPromise(tableId, disableFollow, maxEntriesPerRequest) {
    if (!promises[tableId]) {
      var promiseOfLinkedTables = (0, _pimApi.getCompleteTable)({ pimUrl: pimUrl, headers: headers }, tableId, maxEntriesPerRequest).then(function (table) {
        tables[tableId] = table;
        return Promise.all(_lodash2.default.flatMap(table.columns, function (column) {
          if (!promises[column.toTable] && column.kind === "link" && !isDisabled(column.name, disableFollow)) {
            var filteredDisableFollow = _lodash2.default.filter(disableFollow, function (columns) {
              return !_lodash2.default.isEmpty(columns) && _lodash2.default.head(columns) === column.name;
            });
            var nextDisableFollow = _lodash2.default.map(filteredDisableFollow, function (columns) {
              return _lodash2.default.tail(columns);
            });
            return [getTableAndLinkedTablesAsPromise(column.toTable, nextDisableFollow, maxEntriesPerRequest)];
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

  function isDisabled(columnName, disableFollow) {
    var disabledFollowInTable = _lodash2.default.filter(disableFollow, function (columns) {
      return _lodash2.default.size(columns) === 1;
    });
    return _lodash2.default.some(disabledFollowInTable, function (columns) {
      return _lodash2.default.head(columns) === columnName;
    });
  }
}

function mapRowsOfTables(tables) {
  return _lodash2.default.mapValues(tables, function (table) {
    var mappedTable = table;
    mappedTable.rows = _lodash2.default.transform(table.rows, function (acc, row) {
      acc[row.id] = row;
    }, {});
    return mappedTable;
  });
}