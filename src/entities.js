import _ from "lodash";
import {getCompleteTable, getTablesByNames} from "./pimApi";

export function getEntitiesOfTables(tableNames, options = {}) {
  return getEntitiesOfTable(tableNames, options);
}

export function getEntitiesOfTable(tableNameOrNames, options = {}) {
  const {
    disableFollow = [],
    includeColumns,
    pimUrl,
    maxEntriesPerRequest = 500,
    archived,
    headers = {},
    timeout = 120000 // 2 minutes
  } = options;

  if (_.isNil(pimUrl)) {
    throw new Error("Missing option pimUrl");
  }

  if (!_.isString(pimUrl)) {
    throw new Error("Expecting pimUrl to be a string");
  }

  if (!_.isArray(disableFollow) || _.some(disableFollow, columns => !_.isArray(columns))) {
    throw new Error("Expecting an array of column lists as disableFollow");
  }

  if (_.some(disableFollow, columns => {
    if (columns.includes("**")) {
      const pathAfterDoubleStar = _.takeRightWhile(columns, column => column !== "**");

      return pathAfterDoubleStar.length !== 1;
    }
  })) {
    throw new Error("When using '**' in disableFollow, the column list must contain exactly one column after '**'");
  }

  if (includeColumns && (!_.isArray(includeColumns) || _.some(includeColumns, column => !_.isString(column)))) {
    throw new Error("Expecting an array of columns as includeColumns");
  }

  if (!_.isInteger(maxEntriesPerRequest) || maxEntriesPerRequest <= 0) {
    throw new Error("Expecting maxEntriesPerRequest to be a positive integer greater than 0");
  }

  if (!_.isNil(archived) && !_.isBoolean(archived)) {
    throw new Error("Expecting archived to be a boolean");
  }

  if (!_.isPlainObject(headers) || _.some(headers, value => !_.isString(value))) {
    throw new Error("Expecting headers to be an object of key value pairs (string:string)");
  }

  if (!_.isNil(timeout) && !_.isInteger(timeout)) {
    throw new Error("Expecting timeout to be an integer representing milliseconds");
  }

  const promises = {};
  const tables = {};
  const tableNames = _.concat(tableNameOrNames);

  return getTablesByNames({pimUrl, headers, timeout}, ...tableNames)
    .then(tablesFromPim => _.reduce(tablesFromPim, (accumulatorPromise, table) => {
      return accumulatorPromise.then(() =>
        getTableAndLinkedTablesAsPromise(table.id, disableFollow, maxEntriesPerRequest, archived, includeColumns)
      );
    }, Promise.resolve([])))
    .then(() => {
      _.each(tables, table => {
        table.rows = _.keyBy(table.rows, "id");
      });

      return tables;
    });

  function getTableAndLinkedTablesAsPromise(tableId, disableFollow, maxEntriesPerRequest, archived, includeColumns) {
    if (!promises[tableId]) {
      const promiseOfLinkedTables = getCompleteTable({pimUrl, headers, timeout}, tableId, maxEntriesPerRequest, archived)
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
              const head = _.head(columns);

              return !_.isEmpty(columns) && (head === "**" || head === "*" || head === column.name);
            });

            const nextDisableFollow = _.map(filteredDisableFollow, columns =>
              _.head(columns) === "**" ? columns : _.tail(columns)
            );

            return getTableAndLinkedTablesAsPromise(column.toTable, nextDisableFollow, maxEntriesPerRequest, archived);
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
    const disabledColumns = _.reduce(disableFollow, (disabledColumns, columns) => {
      const head = _.head(columns);
      const second = _.nth(columns, 1);

      if (columns.length === 1) {
        return _.concat(disabledColumns, head);
      }

      if (columns.length === 2 && head === "**") {
        return _.concat(disabledColumns, second);
      }

      return disabledColumns;
    }, []);

    return disabledColumns.includes(columnName) || disabledColumns.includes("*");
  }
}
