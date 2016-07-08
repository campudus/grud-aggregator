import _ from 'lodash';
import { getCompleteTable, getTablesByNames } from './pimApi';
import tablesForLanguages from './translatedTables';

export function getEntitiesOfTables(options, ...tableNames) {
  const {pimUrl, langtags} = options;

  return getPimDataOfTables(pimUrl, tableNames).then(data => tablesForLanguages(data, langtags));

  function getPimDataOfTables(pimUrl, tableNames) {
    const promises = {};
    const tables = {};

    return getTablesByNames(pimUrl, ...tableNames)
      .then(tables => Promise.all(_.map(tables, table => getTableAndLinkedTablesAsPromise(table.id))))
      .then(() => tables);

    function getTableAndLinkedTablesAsPromise(tableId) {
      if (!promises[tableId]) {
        const promiseOfLinkedTables = getCompleteTable(pimUrl, tableId)
          .then(table => {
            tables[tableId] = table;
            return Promise.all(_.flatMap(table.columns, column => {
              if (!promises[column.toTable] && column.kind === 'link') {
                return [getTableAndLinkedTablesAsPromise(column.toTable)];
              } else {
                return [];
              }
            }));
          });

        promises[tableId] = promiseOfLinkedTables;

        return promiseOfLinkedTables;
      } else {
        return promises[tableId];
      }
    }
  }
}
