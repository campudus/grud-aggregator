"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEntitiesOfTables = getEntitiesOfTables;
exports.getEntitiesOfTable = getEntitiesOfTable;

var _lodash = _interopRequireDefault(require("lodash"));

var _pimApi = require("./pimApi");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function getEntitiesOfTables(tableNames) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return getEntitiesOfTable(tableNames, options);
}

function getEntitiesOfTable(tableNameOrNames) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$disableFollo = options.disableFollow,
      disableFollow = _options$disableFollo === void 0 ? [] : _options$disableFollo,
      includeColumns = options.includeColumns,
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
    throw new Error("Expecting an array of column lists as disableFollow");
  }

  if (includeColumns && (!_lodash.default.isArray(includeColumns) || _lodash.default.some(includeColumns, function (column) {
    return !_lodash.default.isString(column);
  }))) {
    throw new Error("Expecting an array of columns as includeColumns");
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

  var tableNames = _lodash.default.concat(tableNameOrNames);

  return _pimApi.getTablesByNames.apply(void 0, [{
    pimUrl: pimUrl,
    headers: headers
  }].concat(_toConsumableArray(tableNames))).then(function (tablesFromPim) {
    return _lodash.default.reduce(tablesFromPim, function (accumulatorPromise, table) {
      return accumulatorPromise.then(function () {
        return getTableAndLinkedTablesAsPromise(table.id, disableFollow, maxEntriesPerRequest, includeColumns);
      });
    }, Promise.resolve([]));
  }).then(function () {
    return mapRowsOfTables(tables);
  });

  function getTableAndLinkedTablesAsPromise(tableId, disableFollow, maxEntriesPerRequest, includeColumns) {
    if (!promises[tableId]) {
      var promiseOfLinkedTables = (0, _pimApi.getCompleteTable)({
        pimUrl: pimUrl,
        headers: headers
      }, tableId, maxEntriesPerRequest).then(function (table) {
        tables[tableId] = table;

        var columnsToFollow = _lodash.default.filter(table.columns, function (_ref) {
          var kind = _ref.kind,
              name = _ref.name,
              toTable = _ref.toTable;
          return !promises[toTable] && kind === "link" && !isColumnDisabled(name, disableFollow) && isColumnIncluded(name, includeColumns);
        });

        return Promise.all(_lodash.default.map(columnsToFollow, function (column) {
          var filteredDisableFollow = _lodash.default.filter(disableFollow, function (columns) {
            return !_lodash.default.isEmpty(columns) && _lodash.default.head(columns) === column.name;
          });

          var nextDisableFollow = _lodash.default.map(filteredDisableFollow, function (columns) {
            return _lodash.default.tail(columns);
          });

          return getTableAndLinkedTablesAsPromise(column.toTable, nextDisableFollow, maxEntriesPerRequest);
        }));
      });
      promises[tableId] = promiseOfLinkedTables;
      return promiseOfLinkedTables;
    } else {
      return promises[tableId];
    }
  }

  function isColumnIncluded(columnName, includeColumns) {
    return _lodash.default.isNil(includeColumns) || _lodash.default.isArray(includeColumns) && includeColumns.includes(columnName);
  }

  function isColumnDisabled(columnName, disableFollow) {
    var disabledColumns = _lodash.default.filter(disableFollow, function (columns) {
      return _lodash.default.size(columns) === 1;
    }).flat();

    return disabledColumns.includes(columnName);
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
