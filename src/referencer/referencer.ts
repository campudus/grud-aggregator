import _ from "lodash";

export function referencer(options = {
  withLanguages: false
}) {
  return entitiesOfPim => {
    const {withLanguages} = options;

    if (withLanguages) {
      return _.transform(entitiesOfPim, (allLanguages, tables, languageTag) => {
        allLanguages[languageTag] = transformTables(tables);
      }, {});
    } else {
      return transformTables(entitiesOfPim);
    }

    function transformTables(tables) {
      const denormalized = {};
      return _.transform(tables, (result, table) => {
        orEmpty(denormalized, table.id);
        result[table.name] = _.mapValues(table.rows, (row, rowId) => {
          denormalized[table.id][rowId] = orEmpty(denormalized, table.id, rowId);
          denormalized[table.id][rowId]["id"] = rowId;

          return _.transform(table.columns, (cells, column, index) => {
            const cellValue = row.values[index];
            if (column.kind === "link") {
              denormalized[table.id][rowId][column.name] = _.map(cellValue, idInOtherTableValue => {
                const idInOtherTable = idInOtherTableValue.id || idInOtherTableValue;
                const res = orEmpty(denormalized, column.toTable, idInOtherTable);
                res.linkRowId = idInOtherTable;
                return res;
              });
            } else {
              denormalized[table.id][rowId][column.name] = cellValue;
            }
            cells[column.name] = denormalized[table.id][rowId][column.name];
          }, {id: rowId});
        });
      }, {});
    }

    function orEmpty(denormalized, tableId, rowId?) {
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
