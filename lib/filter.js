"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filter = filter;
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toArray(r) { return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
      }, {});

      // find table that we want to filter from
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
      }

      // return only tables that have rows / are linked
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
      return _objectSpread(_objectSpread({}, row), {}, {
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