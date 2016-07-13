import _ from 'lodash';
import { getCompleteTable, getTablesByNames } from './pimApi';

export function getEntitiesOfTable(tableName, options) {
  const {pimUrl} = options;

  const promises = {};
  const tables = {};

  return getTablesByNames(pimUrl, tableName)
    .then(tablesFromPim => {
      console.log('Tables from pim', tablesFromPim);
      return Promise.all(_.map(tablesFromPim, table => getTableAndLinkedTablesAsPromise(table.id)));
    })
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
