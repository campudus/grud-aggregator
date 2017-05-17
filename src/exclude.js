import {filter, flatten, flatMap, includes, map, mapValues, transform} from "lodash";

export function exclude(options = {}) {
  const {paths = [], predicate = () => false, preserveConcats = true} = options;

  return data => {
    const tablesToKickNames = flatten(filter(paths, p => p.length === 1));
    const tablesToKickIds = flatMap(tablesToKickNames, name => map(filter(data, t => t.name === name), t => t.id));
    const result = transform(data, (allTables, table) => {
      if (!includes(tablesToKickIds, table.id)) {
        const columnNamesToRemove = map(filter(paths, p => p[0] === table.name), p => p[1]);
        allTables[table.id] = removeColumns(table, columnNamesToRemove, tablesToKickIds);
      }
    }, {});
    return result;
  };

  function removeColumns(table, columnNamesToRemove, removeLinksToTableIds) {
    const columnsToKickIndices = transform(table.columns, (ids, column, idx) => {
      const shouldKickByFunction = predicate(column, table);
      const shouldKickColumn = includes(columnNamesToRemove, column.name);
      const shouldKickLink = column.kind === "link" && includes(removeLinksToTableIds, column.toTable);
      const shouldKickConcat = !preserveConcats && column.kind === "concat";
      if (shouldKickColumn || shouldKickByFunction || shouldKickLink || shouldKickConcat) {
        ids.push(idx);
      }
    }, []);
    const preservedColumns = filter(table.columns, (column, idx) => !includes(columnsToKickIndices, idx));
    const transformedRows = mapValues(table.rows, row => {
      const newValues = transform(row.values, (values, v, idx) => {
        if (!includes(columnsToKickIndices, idx)) {
          values.push(v);
        }
      }, []);
      return Object.assign({}, row, {values: newValues});
    });
    return Object.assign({},
      table,
      {
        columns: preservedColumns,
        rows: transformedRows
      }
    );
  }
}
