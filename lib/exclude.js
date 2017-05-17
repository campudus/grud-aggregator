"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exclude = exclude;

var _lodash = require("lodash");

function exclude() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$paths = options.paths,
      paths = _options$paths === undefined ? [] : _options$paths,
      _options$predicate = options.predicate,
      predicate = _options$predicate === undefined ? function () {
    return false;
  } : _options$predicate,
      _options$preserveConc = options.preserveConcats,
      preserveConcats = _options$preserveConc === undefined ? true : _options$preserveConc;


  return function (data) {
    var tablesToKickNames = (0, _lodash.flatten)((0, _lodash.filter)(paths, function (p) {
      return p.length === 1;
    }));
    var tablesToKickIds = (0, _lodash.flatMap)(tablesToKickNames, function (name) {
      return (0, _lodash.map)((0, _lodash.filter)(data, function (t) {
        return t.name === name;
      }), function (t) {
        return t.id;
      });
    });
    var result = (0, _lodash.transform)(data, function (allTables, table) {
      if (!(0, _lodash.includes)(tablesToKickIds, table.id)) {
        var columnNamesToRemove = (0, _lodash.map)((0, _lodash.filter)(paths, function (p) {
          return p[0] === table.name;
        }), function (p) {
          return p[1];
        });
        allTables[table.id] = removeColumns(table, columnNamesToRemove, tablesToKickIds);
      }
    }, {});
    return result;
  };

  function removeColumns(table, columnNamesToRemove, removeLinksToTableIds) {
    var columnsToKickIndices = (0, _lodash.transform)(table.columns, function (ids, column, idx) {
      var shouldKickByFunction = predicate(column, table);
      var shouldKickColumn = (0, _lodash.includes)(columnNamesToRemove, column.name);
      var shouldKickLink = column.kind === "link" && (0, _lodash.includes)(removeLinksToTableIds, column.toTable);
      var shouldKickConcat = !preserveConcats && column.kind === "concat";
      if (shouldKickColumn || shouldKickByFunction || shouldKickLink || shouldKickConcat) {
        ids.push(idx);
      }
    }, []);
    var preservedColumns = (0, _lodash.filter)(table.columns, function (column, idx) {
      return !(0, _lodash.includes)(columnsToKickIndices, idx);
    });
    var transformedRows = (0, _lodash.mapValues)(table.rows, function (row) {
      var newValues = (0, _lodash.transform)(row.values, function (values, v, idx) {
        if (!(0, _lodash.includes)(columnsToKickIndices, idx)) {
          values.push(v);
        }
      }, []);
      return Object.assign({}, row, { values: newValues });
    });
    return Object.assign({}, table, {
      columns: preservedColumns,
      rows: transformedRows
    });
  }
}