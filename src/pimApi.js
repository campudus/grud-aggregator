import _ from "lodash";
import axios from "axios";

export function getAllTables(options) {
  const {pimUrl, headers = {}} = getOptionsFromParam(options, "getAllTables");

  return request("GET", `${pimUrl}/tables`, {headers}).then(data => data.tables);
}

export function getTablesByNames(options, ...names) {
  return getAllTables(getOptionsFromParam(options, "getTablesByNames"))
    .then(tables => _.filter(tables, t => _.some(names, name => t.name === name)));
}

export function getCompleteTable(options, tableId, maxEntries, includeArchived = true) {
  const {pimUrl, headers = {}} = getOptionsFromParam(options, "getAllTables");

  if (!_.isInteger(tableId) || tableId < 0) {
    throw new Error("Expecting tableId to be a positive integer greater than or equal 0");
  }

  if (!_.isInteger(maxEntries) || maxEntries <= 0) {
    throw new Error("Expecting maxEntriesPerRequest to be a positive integer greater than 0");
  }

  if (!_.isBoolean(includeArchived)) {
    throw new Error("Expecting includeArchived to be a boolean");
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
      const queryString = generateQueryString({ maxEntries, includeArchived });
      const url = `${pimUrl}/tables/${tableId}/rows?${queryString}`;

      return request("GET", url, {headers}).then(result => {
        const totalSize = result.page.totalSize;
        const elements = Math.ceil(totalSize / maxEntries);
        const requests = createArrayOfRequests(pimUrl, tableId, maxEntries, elements, includeArchived);

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

function createArrayOfRequests(pimUrl, tableId, maxEntries, elements, includeArchived) {
  const arr = [];
  for (let i = 0; i < elements - 1; i++) {
    const queryString = generateQueryString({ offset: (i + 1) * maxEntries, maxEntries, includeArchived });
    const url = `${pimUrl}/tables/${tableId}/rows?${queryString}`;

    arr.push(url);
  }
  return arr;
}

function generateQueryString({ offset = 0, maxEntries, includeArchived }) {
  return _.chain({
    offset: offset,
    limit: maxEntries,
    archived: includeArchived ? undefined : includeArchived
  })
    .pickBy(_.negate(_.isNil))
    .map((value, key) => `${key}=${value}`)
    .join("&")
    .value();
}

function request(method, url, options) {
  const {
    headers
  } = options;

  return axios({
    method,
    url,
    headers
  })
    .then(res => res.data);
}
