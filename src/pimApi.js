import _ from "lodash";
import requestPromise from "request-promise-native";

export function getAllTables(options) {
  const {pimUrl, headers = {}} = getOptionsFromParam(options, "getAllTables");

  return request("GET", `${pimUrl}/tables`, {headers}).then(data => data.tables);
}

export function getTablesByNames(options, ...names) {
  return getAllTables(getOptionsFromParam(options, "getTablesByNames"))
    .then(tables => _.filter(tables, t => _.some(names, name => t.name === name)));
}

export function getCompleteTable(options, tableId, maxEntries) {
  const {pimUrl, headers = {}} = getOptionsFromParam(options, "getAllTables");

  if (!_.isInteger(tableId) || tableId < 0) {
    throw new Error("Expecting tableId to be a positive integer greater than or equal 0");
  }

  if (!_.isInteger(maxEntries) || maxEntries <= 0) {
    throw new Error("Expecting maxEntriesPerRequest to be a positive integer greater than 0");
  }

  return request("GET", `${pimUrl}/tables/${tableId}`, {headers})
    .then(table => {
      const tableWithoutMeta = _.omit(table, ["status"]);
      return request("GET", `${pimUrl}/tables/${tableId}/columns`, {headers}).then(result => ({
        ...tableWithoutMeta,
        columns: result.columns
      }));
    })
    .then(tableAndColumns => {
      return request("GET", `${pimUrl}/tables/${tableId}/rows?offset=0&limit=${maxEntries}`, {headers}).then(result => {
        const totalSize = result.page.totalSize;
        const elements = Math.ceil(totalSize / maxEntries);
        const requests = createArrayOfRequests(pimUrl, tableId, maxEntries, elements);

        return requests.reduce((promise, requestUrl) => {
          return promise
            .then(tableColumnsAndRows => {
              return request("GET", requestUrl, {headers})
                .then(rowResult => ({
                  ...tableColumnsAndRows,
                  rows: tableColumnsAndRows.rows.concat(rowResult.rows)
                }));
            });
        }, Promise.resolve({
          ...tableAndColumns,
          rows: result.rows
        }));
      });
    });
}

function getOptionsFromParam(options, fnName) {
  if (_.isString(options)) {
    console.warn(`${fnName}(pimUrl:string, ...) is deprecated. Use ${fnName}(options:object, ...) with an options object like {pimUrl: "http://..."}`);
    return {pimUrl: options};
  } else if (_.isPlainObject(options)) {
    if (_.isNil(options.pimUrl)) {
      throw new Error(`Error in calling ${fnName}. Required option "pimUrl" missing.`);
    }
    if (!_.isString(options.pimUrl)) {
      throw new Error(`Error in calling ${fnName}. Expecting pimUrl to be a string.`);
    }
    return options;
  } else {
    throw new Error(`Error in calling ${fnName}. Expected string or object but was ${typeof options}`);
  }
}

function createArrayOfRequests(pimUrl, tableId, maxEntries, elements) {
  const arr = [];
  for (let i = 0; i < elements - 1; i++) {
    arr.push(`${pimUrl}/tables/${tableId}/rows?offset=${(i + 1) * maxEntries}&limit=${maxEntries}`);
  }
  return arr;
}

function request(method, uri, options) {
  const {
    headers
  } = options;

  return requestPromise({
    method,
    uri,
    headers
  });
}
