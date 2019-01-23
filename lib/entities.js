"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEntitiesOfTable = getEntitiesOfTable;

var _lodash = _interopRequireDefault(require("lodash"));

var _pimApi = require("./pimApi");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getEntitiesOfTable(tableName) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$disableFollo = options.disableFollow,
      disableFollow = _options$disableFollo === void 0 ? [] : _options$disableFollo,
      pimUrl = options.pimUrl,
      _options$maxEntriesPe = options.maxEntriesPerRequest,
      maxEntriesPerRequest = _options$maxEntriesPe === void 0 ? 500 : _options$maxEntriesPe,
      _options$headers = options.headers,
      headers = _options$headers === void 0 ? {} : _options$headers;

  if (_lodash.default.isNil(pimUrl)) {
    throw new Error("Missing option pimUrl");
  }

  if (!_lodash.default.isString(pimUrl)) {
    throw new Error("Expecting pimUrl to be a string");
  }

  if (!_lodash.default.isArray(disableFollow) || _lodash.default.some(disableFollow, function (columns) {
    return !_lodash.default.isArray(columns);
  })) {
    throw new Error("Expecting an array of columns as disableFollow");
  }

  if (!_lodash.default.isInteger(maxEntriesPerRequest) || maxEntriesPerRequest <= 0) {
    throw new Error("Expecting maxEntriesPerRequest to be a positive integer greater than 0");
  }

  if (!_lodash.default.isPlainObject(headers) || _lodash.default.some(headers, function (value) {
    return !_lodash.default.isString(value);
  })) {
    throw new Error("Expecting headers to be an object of key value pairs (string:string)");
  }

  var promises = {};
  var tables = {};
  return (0, _pimApi.getTablesByNames)({
    pimUrl: pimUrl,
    headers: headers
  }, tableName).then(function (tablesFromPim) {
    return Promise.all(_lodash.default.map(tablesFromPim, function (table) {
      return getTableAndLinkedTablesAsPromise(table.id, disableFollow, maxEntriesPerRequest);
    }));
  }).then(function () {
    return mapRowsOfTables(tables);
  });

  function getTableAndLinkedTablesAsPromise(tableId, disableFollow, maxEntriesPerRequest) {
    if (!promises[tableId]) {
      var promiseOfLinkedTables = (0, _pimApi.getCompleteTable)({
        pimUrl: pimUrl,
        headers: headers
      }, tableId, maxEntriesPerRequest).then(function (table) {
        tables[tableId] = table;
        return Promise.all(_lodash.default.flatMap(table.columns, function (column) {
          if (!promises[column.toTable] && column.kind === "link" && !isDisabled(column.name, disableFollow)) {
            var filteredDisableFollow = _lodash.default.filter(disableFollow, function (columns) {
              return !_lodash.default.isEmpty(columns) && _lodash.default.head(columns) === column.name;
            });

            var nextDisableFollow = _lodash.default.map(filteredDisableFollow, function (columns) {
              return _lodash.default.tail(columns);
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
    var disabledFollowInTable = _lodash.default.filter(disableFollow, function (columns) {
      return _lodash.default.size(columns) === 1;
    });

    return _lodash.default.some(disabledFollowInTable, function (columns) {
      return _lodash.default.head(columns) === columnName;
    });
  }
}

function mapRowsOfTables(tables) {
  return _lodash.default.mapValues(tables, function (table) {
    var mappedTable = table;
    mappedTable.rows = _lodash.default.transform(table.rows, function (acc, row) {
      acc[row.id] = row;
    }, {});
    return mappedTable;
  });
}