import _ from 'lodash';
import { getCompleteTable, getTableByName } from './pimApi';
import langtags from './langtags';
import tablesForLanguages from './translatedTables';

export { downloadAndResizeAttachments } from './attachments/attachmentsAggregator';
export { createLanguageJsonForTablesAndColumns } from './tablesAndColumns';

export function getEntitiesOfBikes(pimUrl) {
  return getPimDataOfTable(pimUrl, 'bikeModel')
    .then(data => tablesForLanguages(data, langtags));
}

function getPimDataOfTable(pimUrl, tableName) {
  const promises = {};
  const tables = {};

  return getTableByName(pimUrl, tableName)
    .then(table => getTableAndLinkedTablesAsPromise(table.id))
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
