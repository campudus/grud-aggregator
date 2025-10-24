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
    includeTables,
    excludeTables
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

  if (!_.isNil(includeTables) && (!_.isArray(includeTables) || _.some(includeTables, (value) => !_.isString(value)))) {
    throw new Error("Expecting includeTables to be a list of tableNames");
  }

  if (!_.isNil(excludeTables) && (!_.isArray(excludeTables) || _.some(excludeTables, (value) => !_.isString(value)))) {
    throw new Error("Expecting excludeTables to be a list of tableNames");
  }

  const tablesAndColumns = await getStructure({ pimUrl, headers, timeout });
  const linkIdsByTableId = {};

  for (const table of tablesAndColumns) {
    linkIdsByTableId[table.id] = [];

    for (const column of table.columns) {
      if (column.toTable) {
        const linkTable = _.find(tablesAndColumns, (table) => table.id === column.toTable);
        const isIncluded = _.isNil(includeTables) || _.includes(includeTables, linkTable.name);
        const isExcluded = _.includes(excludeTables, linkTable.name);

        if (isIncluded && !isExcluded) {
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

  const tableIds = _.chain(tableNameOrNames)
    .concat()
    .map((tableName) => _.find(tablesAndColumns, (table) => table.name === tableName)?.id)
    .compact()
    .thru(aggregateTableIds)
    .value();

  const tablesPromises = _.map(tableIds, (tableId) => {
    return getCompleteTable({ pimUrl, headers, timeout }, tableId, maxEntriesPerRequest, archived);
  });

  const tables = await Promise.all(tablesPromises);

  return _.chain(tables)
    .map((table) => ({ ...table, rows: _.keyBy(table.rows, "id") }))
    .keyBy("id")
    .value();
}
