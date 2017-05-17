"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.referencer = referencer;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function referencer() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    withLanguages: false
  };

  return function (entitiesOfPim) {
    var withLanguages = options.withLanguages;


    if (withLanguages) {
      return _lodash2.default.transform(entitiesOfPim, function (allLanguages, tables, languageTag) {
        allLanguages[languageTag] = transformTables(tables);
      }, {});
    } else {
      return transformTables(entitiesOfPim);
    }

    function transformTables(tables) {
      var denormalized = {};
      return _lodash2.default.transform(tables, function (result, table) {
        orEmpty(denormalized, table.id);
        result[table.name] = _lodash2.default.mapValues(table.rows, function (row, rowId) {
          denormalized[table.id][rowId] = orEmpty(denormalized, table.id, rowId);
          denormalized[table.id][rowId]["id"] = rowId;

          return _lodash2.default.transform(table.columns, function (cells, column, index) {
            var cellValue = row.values[index];
            if (column.kind === "link") {
              denormalized[table.id][rowId][column.name] = _lodash2.default.map(cellValue, function (idInOtherTable) {
                var res = orEmpty(denormalized, column.toTable, idInOtherTable);
                res.linkRowId = idInOtherTable;
                return res;
              });
            } else {
              denormalized[table.id][rowId][column.name] = cellValue;
            }
            cells[column.name] = denormalized[table.id][rowId][column.name];
          }, { id: rowId });
        });
      }, {});
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