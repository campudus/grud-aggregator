import _ from "lodash";
import { getCompleteTable, getStructure } from "./pimApi.js";

export function getEntitiesOfTables(tableNames, options = {}) {
  return getEntitiesOfTable(tableNames, options);
}

export async function getEntitiesOfTable(tableNameOrNames, options = {}) {
  const {
    pimUrl,
    maxEntriesPerRequest = 500,
    archived,
    headers = {},
    timeout = 120000, // 2 minutes
    include,
    exclude
  } = options;

  if (_.isNil(pimUrl)) {
    throw new Error("Missing option pimUrl");
  }

  if (!_.isString(pimUrl)) {
    throw new Error("Expecting pimUrl to be a string");
  }

  if (!_.isInteger(maxEntriesPerRequest) || maxEntriesPerRequest <= 0) {
    throw new Error("Expecting maxEntriesPerRequest to be a positive integer greater than 0");
  }

  if (!_.isNil(archived) && !_.isBoolean(archived)) {
    throw new Error("Expecting archived to be a boolean");
  }

  if (!_.isPlainObject(headers) || _.some(headers, (value) => !_.isString(value))) {
    throw new Error("Expecting headers to be an object of key value pairs (string:string)");
  }

  if (!_.isNil(timeout) && !_.isInteger(timeout)) {
    throw new Error("Expecting timeout to be an integer representing milliseconds");
  }

  if (!_.isNil(include) && (!_.isArray(include) || _.some(include, (value) => !_.isString(value)))) {
    throw new Error("Expecting include to be a list of table names, or concatenated table and column names");
  }

  if (!_.isNil(exclude) && (!_.isArray(exclude) || _.some(exclude, (value) => !_.isString(value)))) {
    throw new Error("Expecting include to be a list of table names, or concatenated table and column names");
  }
 
  const isIncluded = (tableName, columnName) => {
    let hasTableMatch = false;
    let hasColumnMatch = false;

    for (const tableAndColumnName of include ?? []) {
      const [includedTableName, includedColumnName] = _.split(tableAndColumnName, ".");

      hasTableMatch = includedTableName === tableName;
      hasColumnMatch = !includedColumnName || !columnName || includedColumnName === columnName;
    }

    return !hasTableMatch || hasColumnMatch;
  };

  const isExcluded = (tableName, columnName) => {
    let hasTableMatch = false;
    let hasColumnMatch = false;

    for (const tableAndColumnName of exclude ?? []) {
      const [excludedTableName, excludedColumnName] = _.split(tableAndColumnName, ".");

      hasTableMatch = excludedTableName === tableName;
      hasColumnMatch = !excludedColumnName || excludedColumnName === columnName;
    }

    return hasTableMatch && hasColumnMatch;
  };

  const tableNames = _.concat(tableNameOrNames);
  const tablesAndColumns = await getStructure({ pimUrl, headers, timeout });
  const linkIdsByTableId = {};

  for (const table of tablesAndColumns) {
    linkIdsByTableId[table.id] = [];
    
    for (const column of table.columns) {
      const isSourceColumnIncluded = isIncluded(table.name, column.name);
      const isSourceColumnExcluded = isExcluded(table.name, column.name);

      if (column.toTable && isSourceColumnIncluded && !isSourceColumnExcluded) {
        const linkTable = _.find(tablesAndColumns, (table) => table.id === column.toTable);
        const isLinkTableIncluded = isIncluded(linkTable.name);
        const isLinkTableExcluded = isExcluded(linkTable.name);

        if (isLinkTableIncluded && !isLinkTableExcluded) {
          linkIdsByTableId[table.id].push(linkTable.id);
        }
      }
    }
  }

  const aggregateTableIds = (tableIds) => {
    const linkIds = _.flatMap(tableIds, (id) => linkIdsByTableId[id]);
    const tableAndLinkedIds = _.uniq([...tableIds, ...linkIds]);
    const diffIds = _.difference(tableAndLinkedIds, tableIds);

    return diffIds.length === 0 ? tableAndLinkedIds : aggregateTableIds(tableAndLinkedIds);
  };

  const tableIds = _.chain(tableNames)
    .map((tableName) => _.find(tablesAndColumns, (table) => table.name === tableName)?.id)
    .compact()
    .thru(aggregateTableIds)
    .value();
  
  console.log({ linkIdsByTableId, tableIds });

  const tablesPromises = _.map(tableIds, (tableId) => {
    const table = _.find(tablesAndColumns, (table) => table.id === tableId);
    const columnIds = _.chain(table.columns)
      .filter((column) => isIncluded(table.name, column.name) && !isExcluded(table.name, column.name))
      .filter((column) => column.id > 0) // maybe remove error in backend so we dont have to filter ID column
      .map((column) => column.id)
      .value();
    return getCompleteTable({ pimUrl, headers, timeout }, tableId, maxEntriesPerRequest, archived, columnIds);
  });

  const tables = await Promise.all(tablesPromises);

  return _.chain(tables)
    .map((table) => ({ ...table, rows: _.keyBy(table.rows, "id") }))
    .keyBy("id")
    .value();
}
