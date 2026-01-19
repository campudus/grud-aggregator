"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.referencer = referencer;
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function referencer() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    withLanguages: false
  };
  return function (entitiesOfPim) {
    var withLanguages = options.withLanguages;
    if (withLanguages) {
      return _lodash.default.transform(entitiesOfPim, function (allLanguages, tables, languageTag) {
        allLanguages[languageTag] = transformTables(tables);
      }, {});
    } else {
      return transformTables(entitiesOfPim);
    }
    function transformTables(tables) {
      var denormalized = {};
      return _lodash.default.transform(tables, function (result, table) {
        orEmpty(denormalized, table.id);
        result[table.name] = _lodash.default.mapValues(table.rows, function (row, rowId) {
          denormalized[table.id][rowId] = orEmpty(denormalized, table.id, rowId);
          denormalized[table.id][rowId]["id"] = rowId;
          return _lodash.default.transform(table.columns, function (cells, column, index) {
            var cellValue = row.values[index];
            if (column.kind === "link") {
              denormalized[table.id][rowId][column.name] = _lodash.default.map(cellValue, function (idInOtherTableValue) {
                var idInOtherTable = idInOtherTableValue.id || idInOtherTableValue;
                var res = orEmpty(denormalized, column.toTable, idInOtherTable);
                res.linkRowId = idInOtherTable;
                return res;
              });
            } else if (column.kind === "group") {
              denormalized[table.id][rowId][column.name] = processGroupColumn(column, cellValue, denormalized);
            } else {
              denormalized[table.id][rowId][column.name] = cellValue;
            }
            cells[column.name] = denormalized[table.id][rowId][column.name];
          }, {
            id: rowId
          });
        });
      }, {});
    }
    function processGroupColumn(groupColumn, groupValue, denormalized) {
      // groupValue is an array like ["Vorderlicht", [1, 2]]
      // Keep the array structure, but resolve links
      return _lodash.default.map(groupValue, function (subValue, subIndex) {
        var subColumn = groupColumn.groups[subIndex];
        if (subColumn && subColumn.kind === "link") {
          // Link column within the group: resolve references
          return _lodash.default.map(subValue, function (idInOtherTableValue) {
            var idInOtherTable = idInOtherTableValue.id || idInOtherTableValue;
            var res = orEmpty(denormalized, subColumn.toTable, idInOtherTable);
            res.linkRowId = idInOtherTable;
            return res;
          });
        } else {
          // Other columns: return value unchanged
          return subValue;
        }
      });
    }
    function orEmpty(denormalized, tableId, rowId) {
      denormalized[tableId] = denormalized[tableId] || {};
      if (typeof rowId !== "undefined") {
        denormalized[tableId][rowId] = denormalized[tableId][rowId] || {};
        return denormalized[tableId][rowId];
      } else {
        return denormalized[tableId];
      }
    }
  };
}