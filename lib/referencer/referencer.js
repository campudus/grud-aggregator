'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reference = reference;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reference(entitiesOfPim, withoutLanguages) {

  if (withoutLanguages) {
    return transformTables(entitiesOfPim);
  } else {
    return _lodash2.default.transform(entitiesOfPim, function (allLanguages, tables, languageTag) {
      allLanguages[languageTag] = transformTables(tables);
    }, {});
  }

  function transformTables(tables) {
    var denormalized = {};
    return _lodash2.default.transform(tables, function (result, table) {
      orEmpty(denormalized, table.id);
      result[table.name] = _lodash2.default.mapValues(table.rows, function (values, rowId) {
        denormalized[table.id][rowId] = orEmpty(denormalized, table.id, rowId);
        denormalized[table.id][rowId]['id'] = rowId;

        return _lodash2.default.transform(table.columns, function (cells, column, index) {
          if (column.kind === 'link') {
            denormalized[table.id][rowId][column.name] = _lodash2.default.map(values[index], function (idInOtherTable) {
              var res = orEmpty(denormalized, column.toTable, idInOtherTable);
              res.linkRowId = idInOtherTable;
              return res;
            });
          } else {
            denormalized[table.id][rowId][column.name] = values[index];
          }
          cells[column.name] = denormalized[table.id][rowId][column.name];
        }, { id: rowId });
      });
    }, {});
  }

  function orEmpty(denormalized, tableId, rowId) {
    denormalized[tableId] = denormalized[tableId] || {};
    if (typeof rowId !== 'undefined') {
      denormalized[tableId][rowId] = denormalized[tableId][rowId] || {};
      return denormalized[tableId][rowId];
    } else {
      return denormalized[tableId];
    }
  }
}