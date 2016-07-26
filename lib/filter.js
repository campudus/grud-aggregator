'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.filter = filter;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function filter(filter) {
  var predicate = !_lodash2.default.isNil(filter) && _lodash2.default.isFunction(filter.predicate) ? filter.predicate : function () {
    return true;
  };
  return function (data) {
    if (filter && !_lodash2.default.isEmpty(filter.path)) {
      var _ret = function () {
        // keep the table data without any initial data (rows)
        var accTables = _lodash2.default.transform(data, function (all, table) {
          all[table.id] = _lodash2.default.omit(table, 'rows');
        }, {});

        // find table that we want to filter from
        var table = _lodash2.default.find(data, function (table) {
          return table.name === filter.path[0];
        });
        if (table) {

          // add all dependencies of this into allTables
          accTables[table.id].rows = _lodash2.default.transform(table.rows, function (rows, row) {
            // find values that match predicate
            if (matches(filter.path, row, table, predicate)) {
              rows[row.id] = row;
            }
          }, {});
          addDependenciesOfTable(data, accTables, accTables[table.id]);
        }

        // return only tables that have rows / are linked
        return {
          v: _lodash2.default.omitBy(accTables, function (table) {
            return _lodash2.default.isEmpty(table.rows);
          })
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    } else {
      return data;
    }

    function addDependenciesOfTable(data, accTables, currentTable) {
      var linksOfCurrentTableToCheck = _lodash2.default.transform(currentTable.columns, function (acc, column, idx) {
        if (column.kind === 'link') {
          acc[column.toTable] = _lodash2.default.reduce(currentTable.rows, function (linkIds, rowValue) {
            return _lodash2.default.union(linkIds, _lodash2.default.map(rowValue.values[idx], function (link) {
              return link.id;
            }));
          }, acc[column.toTable] || []);
        }
      }, {});
      var missing = _lodash2.default.transform(linksOfCurrentTableToCheck, function (missing, linkedRowIds, tableId) {
        var existingRows = _lodash2.default.map(accTables[tableId].rows, function (row) {
          return row.id;
        });
        missing[tableId] = missing[tableId] || linkedRowIds;
        missing[tableId] = _lodash2.default.difference(missing[tableId], existingRows);
      }, {});

      if (!_lodash2.default.every(missing, _lodash2.default.isEmpty)) {
        _lodash2.default.forEach(missing, function (linksInTable, tableId) {
          accTables[tableId].rows = _lodash2.default.transform(linksInTable, function (rows, toRowId) {
            rows[toRowId] = data[tableId].rows[toRowId];
          }, accTables[tableId].rows || {});
          addDependenciesOfTable(data, accTables, accTables[tableId], linksInTable);
        });
      }
    }

    function matches(_ref, row, currentTable, predicate) {
      var _ref2 = _toArray(_ref);

      var currentColumn = _ref2[0];

      var columnsToWalk = _ref2.slice(1);

      if (_lodash2.default.isEmpty(columnsToWalk)) {
        var element = toElement(row, currentTable);
        return predicate(element);
      } else {
        var _ret2 = function () {
          var nextColumnName = columnsToWalk[0];
          var nextColumnIdx = _lodash2.default.findIndex(currentTable.columns, function (col) {
            return col.name === nextColumnName;
          });
          if (nextColumnIdx === -1) {
            return {
              v: false
            }; // non existent path
          } else {
            var _ret3 = function () {
              var nextColumn = currentTable.columns[nextColumnIdx];
              var nextLinks = _lodash2.default.map(row.values[nextColumnIdx], function (link) {
                return link.id;
              });
              var nextTableId = nextColumn.toTable;
              var nextTable = data[nextTableId];
              var nextColumnsToWalk = columnsToWalk;
              var nextRows = _lodash2.default.map(nextLinks, function (rowIdInNextTable) {
                return nextTable.rows[rowIdInNextTable];
              });

              return {
                v: {
                  v: _lodash2.default.some(nextRows, function (nextRow) {
                    return matches(nextColumnsToWalk, nextRow, nextTable, predicate);
                  })
                }
              };
            }();

            if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
          }
        }();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
      }
    }

    function toElement(row, table) {
      return _lodash2.default.reduce(table.columns, function (element, column, idx) {
        element[column.name] = row.values[idx];
        return element;
      }, {});
    }
  };
}