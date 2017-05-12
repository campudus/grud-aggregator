import {filter, flatten, flatMap, mapValues, transform} from "lodash";

export function exclude(options = {}) {
  const {paths = [], predicate = () => false, preserveConcats = true} = options;

  return data => {
    const tablesToKickNames = flatten(paths.filter(p => p.length === 1));
    const tablesToKickIds = flatMap(tablesToKickNames, name => filter(data, t => t.name === name).map(t => t.id));
    const result = transform(data, (allTables, table) => {
      if (!tablesToKickIds.includes(table.id)) {
        const columnNamesToRemove = paths.filter(p => p[0] === table.name).map(p => p[1]);
        allTables[table.id] = removeColumns(table, columnNamesToRemove, tablesToKickIds);
      }
    }, {});
    return result;
  };

  function removeColumns(table, columnNamesToRemove, removeLinksToTableIds) {
    const columnsToKickIndices = transform(table.columns, (ids, column, idx) => {
      const shouldKickByFunction = predicate(column, table);
      const shouldKickColumn = columnNamesToRemove.includes(column.name);
      const shouldKickLink = column.kind === "link" && removeLinksToTableIds.includes(column.toTable);
      const shouldKickConcat = !preserveConcats && column.kind === "concat";
      if (shouldKickColumn || shouldKickByFunction || shouldKickLink || shouldKickConcat) {
        ids.push(idx);
      }
    }, []);
    const preservedColumns = filter(table.columns, (column, idx) => !columnsToKickIndices.includes(idx));
    const transformedRows = mapValues(table.rows, row => {
      const newValues = transform(row.values, (values, v, idx) => {
        if (!columnsToKickIndices.includes(idx)) {
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
