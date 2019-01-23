"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filter = filter;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      excludeBacklinks = _ref$excludeBacklinks === void 0 ? false : _ref$excludeBacklinks,
      _ref$filterBacklinks = _ref.filterBacklinks,
      filterBacklinks = _ref$filterBacklinks === void 0 ? false : _ref$filterBacklinks,
      _ref$path = _ref.path,
      path = _ref$path === void 0 ? [] : _ref$path,
      _ref$predicate = _ref.predicate,
      predicate = _ref$predicate === void 0 ? defaultPredicate : _ref$predicate,
      _ref$ignoreMissing = _ref.ignoreMissing,
      ignoreMissing = _ref$ignoreMissing === void 0 ? false : _ref$ignoreMissing;

  if (excludeBacklinks && filterBacklinks) {
    console.warn("Both filterBacklinks and excludeBacklinks options are turned on. excludeBacklinks will override " + "the filterBacklinks setting!");
  }

  return function (data) {
    if (!_lodash.default.isEmpty(path)) {
      // keep the table data without any initial data (rows)
      var accTables = _lodash.default.transform(data, function (all, table) {
        all[table.id] = _lodash.default.omit(table, "rows");
      }, {}); // find table that we want to filter from


      var firstTable = _lodash.default.find(data, function (table) {
        return table.name === path[0];
      });

      if (firstTable) {
        // add all dependencies of this into allTables
        accTables[firstTable.id].rows = _lodash.default.transform(firstTable.rows, function (rows, row) {
          // find values that match predicate
          if (matches(data, path, row, firstTable, predicate)) {
            rows[row.id] = row;
          }
        }, {});
        addDependenciesOfTable(data, accTables, accTables[firstTable.id], excludeBacklinks, "".concat(firstTable.id), ignoreMissing, filterBacklinks);

        if (excludeBacklinks || filterBacklinks) {
          return _lodash.default.omitBy(removeBrokenLinksToFirstTable(accTables, firstTable.id), function (table) {
            return _lodash.default.isEmpty(table.rows);
          });
        }
      } // return only tables that have rows / are linked


      return _lodash.default.omitBy(accTables, function (table) {
        return _lodash.default.isEmpty(table.rows);
      });
    } else {
      return data;
    }
  };
}

function removeBrokenLinksToFirstTable(accTables, firstTableId) {
  return _lodash.default.mapValues(accTables, function (table) {
    var columnIdxsOfLinks = _lodash.default.transform(table.columns, function (cols, column, idx) {
      if (column.kind === "link" && column.toTable === firstTableId) {
        cols.push(idx);
      }
    }, []);

    table.rows = _lodash.default.mapValues(table.rows, function (row) {
      return _objectSpread({}, row, {
        values: _lodash.default.map(row.values, function (value, idx) {
          if (_lodash.default.includes(columnIdxsOfLinks, idx)) {
            return _lodash.default.filter(value, function (link) {
              return !_lodash.default.isNil(accTables[firstTableId].rows[link.id]);
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
  var linksOfCurrentTableToCheck = _lodash.default.transform(currentTable.columns, function (acc, column, idx) {
    if (column.kind === "link") {
      acc[column.toTable] = _lodash.default.reduce(currentTable.rows, function (linkIds, rowValue) {
        if (_lodash.default.isNil(rowValue)) {
          return linkIds;
        } else {
          return _lodash.default.union(linkIds, _lodash.default.map(rowValue.values[idx], function (link) {
            return link.id;
          }));
        }
      }, acc[column.toTable] || []);
    }
  }, {});

  var missing = _lodash.default.transform(linksOfCurrentTableToCheck, function (missing, linkedRowIds, tableId) {
    var isExcludedLink = excludeBacklinks && tableId === excludedTableId;

    if (!isExcludedLink) {
      var existingRows = _lodash.default.isNil(accTables[tableId]) ? [] : _lodash.default.map(accTables[tableId].rows, function (row) {
        return row.id;
      });
      missing[tableId] = missing[tableId] || linkedRowIds;
      missing[tableId] = _lodash.default.difference(missing[tableId], existingRows);
    }
  }, {});

  var filteredMissing = _lodash.default.omitBy(missing, _lodash.default.isEmpty);

  _lodash.default.forEach(filteredMissing, function (linksInTable, tableId) {
    var filtered = filterBacklinks && tableId === excludedTableId;

    if (_lodash.default.isNil(accTables[tableId])) {
      if (!ignoreMissing) {
        console.warn("Linking to a missing table - ignoring!", ignoreMissing);
      }
    } else if (!filtered) {
      accTables[tableId].rows = _lodash.default.transform(linksInTable, function (rows, toRowId) {
        var entity = allTables[tableId].rows[toRowId];

        if (_lodash.default.isNil(entity)) {
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

  if (_lodash.default.isEmpty(columnsToWalk)) {
    var element = toElement(row, currentTable);
    return predicate(element);
  } else {
    var nextColumnName = columnsToWalk[0];

    var nextColumnIdx = _lodash.default.findIndex(currentTable.columns, function (col) {
      return col.name === nextColumnName;
    });

    if (nextColumnIdx === -1) {
      return false; // non existent path
    } else {
      var nextColumn = currentTable.columns[nextColumnIdx];

      var nextLinks = _lodash.default.map(row.values[nextColumnIdx], function (link) {
        return link.id;
      });

      var nextTableId = nextColumn.toTable;
      var nextTable = allTables[nextTableId];
      var nextColumnsToWalk = columnsToWalk;

      var nextRows = _lodash.default.map(nextLinks, function (rowIdInNextTable) {
        return nextTable.rows[rowIdInNextTable];
      });

      return _lodash.default.some(nextRows, function (nextRow) {
        return matches(allTables, nextColumnsToWalk, nextRow, nextTable, predicate);
      });
    }
  }
}

function toElement(row, table) {
  return _lodash.default.reduce(table.columns, function (element, column, idx) {
    element[column.name] = row.values[idx];
    return element;
  }, {
    id: row.id
  });
}