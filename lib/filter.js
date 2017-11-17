"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.filter = filter;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var defaultPredicate = function defaultPredicate() {
  return true;
};

function filter() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    excludeBacklinks: false,
    filterBacklinks: false,
    path: [],
    predicate: defaultPredicate,
    ignoreMissing: false
  },
      _ref$excludeBacklinks = _ref.excludeBacklinks,
      excludeBacklinks = _ref$excludeBacklinks === undefined ? false : _ref$excludeBacklinks,
      _ref$filterBacklinks = _ref.filterBacklinks,
      filterBacklinks = _ref$filterBacklinks === undefined ? false : _ref$filterBacklinks,
      _ref$path = _ref.path,
      path = _ref$path === undefined ? [] : _ref$path,
      _ref$predicate = _ref.predicate,
      predicate = _ref$predicate === undefined ? defaultPredicate : _ref$predicate,
      _ref$ignoreMissing = _ref.ignoreMissing,
      ignoreMissing = _ref$ignoreMissing === undefined ? false : _ref$ignoreMissing;

  if (excludeBacklinks && filterBacklinks) {
    console.warn("Both filterBacklinks and excludeBacklinks options are turned on. excludeBacklinks will override " + "the filterBacklinks setting!");
  }

  return function (data) {
    if (!_lodash2.default.isEmpty(path)) {
      // keep the table data without any initial data (rows)
      var accTables = _lodash2.default.transform(data, function (all, table) {
        all[table.id] = _lodash2.default.omit(table, "rows");
      }, {});

      // find table that we want to filter from
      var firstTable = _lodash2.default.find(data, function (table) {
        return table.name === path[0];
      });
      if (firstTable) {

        // add all dependencies of this into allTables
        accTables[firstTable.id].rows = _lodash2.default.transform(firstTable.rows, function (rows, row) {
          // find values that match predicate
          if (matches(data, path, row, firstTable, predicate)) {
            rows[row.id] = row;
          }
        }, {});

        addDependenciesOfTable(data, accTables, accTables[firstTable.id], excludeBacklinks, "" + firstTable.id, ignoreMissing, filterBacklinks);

        if (excludeBacklinks || filterBacklinks) {
          return _lodash2.default.omitBy(removeBrokenLinksToFirstTable(accTables, firstTable.id), function (table) {
            return _lodash2.default.isEmpty(table.rows);
          });
        }
      }

      // return only tables that have rows / are linked
      return _lodash2.default.omitBy(accTables, function (table) {
        return _lodash2.default.isEmpty(table.rows);
      });
    } else {
      return data;
    }
  };
}

function removeBrokenLinksToFirstTable(accTables, firstTableId) {
  return _lodash2.default.mapValues(accTables, function (table) {
    var columnIdxsOfLinks = _lodash2.default.transform(table.columns, function (cols, column, idx) {
      if (column.kind === "link" && column.toTable === firstTableId) {
        cols.push(idx);
      }
    }, []);
    table.rows = _lodash2.default.mapValues(table.rows, function (row) {
      return _extends({}, row, {
        values: _lodash2.default.map(row.values, function (value, idx) {
          if (_lodash2.default.includes(columnIdxsOfLinks, idx)) {
            return _lodash2.default.filter(value, function (link) {
              return !_lodash2.default.isNil(accTables[firstTableId].rows[link.id]);
            });
          } else {
            return value;
          }
        })
      });
    });
    return table;
  });
}

function addDependenciesOfTable(allTables, accTables, currentTable, excludeBacklinks, excludedTableId, ignoreMissing, filterBacklinks) {

  var linksOfCurrentTableToCheck = _lodash2.default.transform(currentTable.columns, function (acc, column, idx) {
    if (column.kind === "link") {
      acc[column.toTable] = _lodash2.default.reduce(currentTable.rows, function (linkIds, rowValue) {
        if (_lodash2.default.isNil(rowValue)) {
          return linkIds;
        } else {
          return _lodash2.default.union(linkIds, _lodash2.default.map(rowValue.values[idx], function (link) {
            return link.id;
          }));
        }
      }, acc[column.toTable] || []);
    }
  }, {});

  var missing = _lodash2.default.transform(linksOfCurrentTableToCheck, function (missing, linkedRowIds, tableId) {
    var isExcludedLink = excludeBacklinks && tableId === excludedTableId;
    if (!isExcludedLink) {
      var existingRows = _lodash2.default.isNil(accTables[tableId]) ? [] : _lodash2.default.map(accTables[tableId].rows, function (row) {
        return row.id;
      });
      missing[tableId] = missing[tableId] || linkedRowIds;
      missing[tableId] = _lodash2.default.difference(missing[tableId], existingRows);
    }
  }, {});

  var filteredMissing = _lodash2.default.omitBy(missing, _lodash2.default.isEmpty);

  _lodash2.default.forEach(filteredMissing, function (linksInTable, tableId) {
    var filtered = filterBacklinks && tableId === excludedTableId;
    if (_lodash2.default.isNil(accTables[tableId])) {
      if (!ignoreMissing) {
        console.warn("Linking to a missing table - ignoring!", ignoreMissing);
      }
    } else if (!filtered) {
      accTables[tableId].rows = _lodash2.default.transform(linksInTable, function (rows, toRowId) {
        var entity = allTables[tableId].rows[toRowId];
        if (_lodash2.default.isNil(entity)) {
          if (!ignoreMissing) {
            console.warn("Missing entity", toRowId, "in table", tableId);
          }
        } else {
          rows[toRowId] = entity;
        }
      }, accTables[tableId].rows || {});

      addDependenciesOfTable(allTables, accTables, accTables[tableId], excludeBacklinks, excludedTableId, ignoreMissing, filterBacklinks);
    }
  });
}

function matches(allTables, _ref2, row, currentTable, predicate) {
  var _ref3 = _toArray(_ref2),
      currentColumn = _ref3[0],
      columnsToWalk = _ref3.slice(1);

  if (_lodash2.default.isEmpty(columnsToWalk)) {
    var element = toElement(row, currentTable);
    return predicate(element);
  } else {
    var nextColumnName = columnsToWalk[0];
    var nextColumnIdx = _lodash2.default.findIndex(currentTable.columns, function (col) {
      return col.name === nextColumnName;
    });
    if (nextColumnIdx === -1) {
      return false; // non existent path
    } else {
      var nextColumn = currentTable.columns[nextColumnIdx];
      var nextLinks = _lodash2.default.map(row.values[nextColumnIdx], function (link) {
        return link.id;
      });
      var nextTableId = nextColumn.toTable;
      var nextTable = allTables[nextTableId];
      var nextColumnsToWalk = columnsToWalk;
      var nextRows = _lodash2.default.map(nextLinks, function (rowIdInNextTable) {
        return nextTable.rows[rowIdInNextTable];
      });

      return _lodash2.default.some(nextRows, function (nextRow) {
        return matches(allTables, nextColumnsToWalk, nextRow, nextTable, predicate);
      });
    }
  }
}

function toElement(row, table) {
  return _lodash2.default.reduce(table.columns, function (element, column, idx) {
    element[column.name] = row.values[idx];
    return element;
  }, { id: row.id });
}