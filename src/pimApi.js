import _ from "lodash";

export function getStructure(options) {
  const {pimUrl, headers, timeout} = getOptionsFromParam(options, "getStructure");

  return request(`${pimUrl}/structure`, {headers, timeout}).then(data => data.tables);
}

export function getAllTables(options) {
  const {pimUrl, headers, timeout} = getOptionsFromParam(options, "getAllTables");

  return request(`${pimUrl}/tables`, {headers, timeout}).then(data => data.tables);
}

export function getTablesByNames(options, ...names) {
  return getAllTables(getOptionsFromParam(options, "getTablesByNames"))
    .then(tables => _.filter(tables, t => _.some(names, name => t.name === name)));
}

export function getCompleteTable(options, tableId, maxEntries, archived, columnIds) {
  const {pimUrl, headers, timeout} = getOptionsFromParam(options, "getAllTables");

  if (!_.isInteger(tableId) || tableId < 0) {
    throw new Error("Expecting tableId to be a positive integer greater than or equal 0");
  }

  if (!_.isInteger(maxEntries) || maxEntries <= 0) {
    throw new Error("Expecting maxEntriesPerRequest to be a positive integer greater than 0");
  }

  if (!_.isNil(archived) && !_.isBoolean(archived)) {
    throw new Error("Expecting archived to be a boolean");
  }

  if (!_.isNil(columnIds) && (!_.isArray(columnIds) || _.some(columnIds, (value) => !_.isInteger(value) || value < 0))) {
    throw new Error("Expecting columnIds to be an array of positive integers greater than or equal 0");
  }

  return request(`${pimUrl}/tables/${tableId}`, {headers, timeout})
    .then(table => {
      const tableWithoutMeta = _.omit(table, ["status"]);
      const queryString = generateQueryString({ columnIds });

      return request(`${pimUrl}/tables/${tableId}/columns?${queryString}`, {headers, timeout}).then(result => ({
        ...tableWithoutMeta,
        columns: result.columns
      }));
    })
    .then(tableAndColumns => {
      const queryString = generateQueryString({ limit: maxEntries, archived, columnIds });
      const url = `${pimUrl}/tables/${tableId}/rows?${queryString}`;

      return request(url, {headers, timeout}).then(result => {
        const totalSize = result.page.totalSize;
        const elements = Math.ceil(totalSize / maxEntries);
        const requests = createArrayOfRequests(pimUrl, tableId, maxEntries, elements, archived, columnIds);

        return requests.reduce((promise, requestUrl) => {
          return promise
            .then(tableColumnsAndRows => {
              return request(requestUrl, {headers, timeout})
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

function createArrayOfRequests(pimUrl, tableId, maxEntries, elements, archived, columnIds) {
  const arr = [];
  for (let i = 0; i < elements - 1; i++) {
    const queryString = generateQueryString({ offset: (i + 1) * maxEntries, limit: maxEntries, archived, columnIds });
    const url = `${pimUrl}/tables/${tableId}/rows?${queryString}`;

    arr.push(url);
  }
  return arr;
}

function generateQueryString({ offset = 0, limit, archived, columnIds }) {
  return _.toPairs(
    _.omitBy(
      {
        offset: offset,
        limit: limit,
        archived: archived,
        columnIds: !_.isEmpty(columnIds) ? columnIds.join(",") : null
      },
      _.isNil
    )
  )
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}

async function fetchWithTimeout(url, options = {}, timeoutMs) {
  const controller = new AbortController();
  const timeout = timeoutMs ? setTimeout(() => controller.abort(`Request timed out after ${timeoutMs}ms.`), timeoutMs) : null;

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });

    clearTimeout(timeout);

    let json;

    try {
      json = await response.json();
    } catch (error) {
      json = {};
    }

    return json;
  } catch (error) {
    clearTimeout(timeout);

    if (typeof error === "string") {
      throw new Error(error);
    }

    throw error;
  }
}

function request(url, { headers, timeout }) {
  return fetchWithTimeout(url, { method: "GET", headers }, timeout);
}
