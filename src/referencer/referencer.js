import _ from 'lodash';

export function reference(entitiesOfPim, withoutLanguages) {

  if (withoutLanguages) {
    return transformTables(entitiesOfPim);
  } else {
    return _.transform(entitiesOfPim, (allLanguages, tables, languageTag) => {
      allLanguages[languageTag] = transformTables(tables);
    }, {});
  }

  function transformTables(tables) {
    const denormalized = {};
    return _.transform(tables, (result, table) => {
      orEmpty(denormalized, table.id);
      result[table.name] = _.mapValues(table.rows, (values, rowId) => {
        denormalized[table.id][rowId] = orEmpty(denormalized, table.id, rowId);
        denormalized[table.id][rowId]['id'] = rowId;

        return _.transform(table.columns, (cells, column, index) => {
          if (column.kind === 'link') {
            denormalized[table.id][rowId][column.name] = _.map(values[index], idInOtherTable => {
              const res = orEmpty(denormalized, column.toTable, idInOtherTable);
              res.linkRowId = idInOtherTable;
              return res;
            });
          } else {
            denormalized[table.id][rowId][column.name] = values[index];
          }
          cells[column.name] = denormalized[table.id][rowId][column.name];
        }, {id : rowId});
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
