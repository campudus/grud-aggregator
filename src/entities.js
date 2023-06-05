import _ from "lodash";
import {getCompleteTable, getTablesByNames} from "./pimApi";

export function getEntitiesOfTables(tableNames, options = {}) {
  return getEntitiesOfTable(tableNames, options);
}

export function getEntitiesOfTable(tableNameOrNames, options = {}) {
  const {disableFollow = [], includeColumns, pimUrl, maxEntriesPerRequest = 500, headers = {}} = options;

  if (_.isNil(pimUrl)) {
    throw new Error("Missing option pimUrl");
  }

  if (!_.isString(pimUrl)) {
    throw new Error("Expecting pimUrl to be a string");
  }

  if (!_.isArray(disableFollow) || _.some(disableFollow, columns => !_.isArray(columns))) {
    throw new Error("Expecting an array of column lists as disableFollow");
  }

  if (includeColumns && (!_.isArray(includeColumns) || _.some(includeColumns, column => !_.isString(column)))) {
    throw new Error("Expecting an array of columns as includeColumns");
  }

  if (!_.isInteger(maxEntriesPerRequest) || maxEntriesPerRequest <= 0) {
    throw new Error("Expecting maxEntriesPerRequest to be a positive integer greater than 0");
  }

  if (!_.isPlainObject(headers) || _.some(headers, value => !_.isString(value))) {
    throw new Error("Expecting headers to be an object of key value pairs (string:string)");
  }

  const promises = {};
  const tables = {};
  const tableNames = _.concat(tableNameOrNames);

  return getTablesByNames({pimUrl, headers}, ...tableNames)
    .then(tablesFromPim => _.reduce(tablesFromPim, (accumulatorPromise, table) => {
      return accumulatorPromise.then(() =>
        getTableAndLinkedTablesAsPromise(table.id, disableFollow, maxEntriesPerRequest, includeColumns)
      );
    }, Promise.resolve([])))
    .then(() => mapRowsOfTables(tables));

  function getTableAndLinkedTablesAsPromise(tableId, disableFollow, maxEntriesPerRequest, includeColumns) {
    if (!promises[tableId]) {
      const promiseOfLinkedTables = getCompleteTable({pimUrl, headers}, tableId, maxEntriesPerRequest)
        .then(table => {
          tables[tableId] = table;

          const columnsToFollow = _.filter(table.columns, ({kind, name, toTable}) => {
            return (
              !promises[toTable]
              && kind === "link"
              && !isColumnDisabled(name, disableFollow)
              && isColumnIncluded(name, includeColumns)
            );
          });

          return Promise.all(_.map(columnsToFollow, column => {
            const filteredDisableFollow = _.filter(disableFollow, columns => {
              return !_.isEmpty(columns) && _.head(columns) === column.name;
            });

            const nextDisableFollow = _.map(filteredDisableFollow, columns => _.tail(columns));

            return getTableAndLinkedTablesAsPromise(column.toTable, nextDisableFollow, maxEntriesPerRequest);
          }));
        });

      promises[tableId] = promiseOfLinkedTables;

      return promiseOfLinkedTables;
    } else {
      return promises[tableId];
    }
  }

  function isColumnIncluded(columnName, includeColumns) {
    return _.isNil(includeColumns) || _.isArray(includeColumns) && includeColumns.includes(columnName);
  }

  function isColumnDisabled(columnName, disableFollow) {
    const disabledColumns = _.filter(disableFollow, columns => _.size(columns) === 1).flat();

    return disabledColumns.includes(columnName);
  }
}

function mapRowsOfTables(tables) {
  return _.mapValues(tables, table => {
    const mappedTable = table;
    mappedTable.rows = _.transform(table.rows, (acc, row) => {
      acc[row.id] = row;
    }, {});
    return mappedTable;
  });
}
