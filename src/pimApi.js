import _ from 'lodash';
import superagent from 'superagent';

export function getAllTables(pimUrl) {
  return request('GET', `${pimUrl}/tables`).then(data => data.tables);
}

export function getTablesByNames(pimUrl, ...names) {
  return getAllTables(pimUrl)
    .then(tables => _.filter(tables, t => _.some(names, name => t.name === name)));
}

export function getCompleteTable(pimUrl, tableId, maxEntries) {
  if (maxEntries === 0) {
    return request('GET', `${pimUrl}/completetable/${tableId}`);
  } else {
    return request('GET', `${pimUrl}/tables/${tableId}`)
      .then(table => {
        const tableWithoutMeta = table;
        delete tableWithoutMeta["status"];
        return request('GET', `${pimUrl}/tables/${tableId}/columns`).then(result => ({
          ...tableWithoutMeta,
          columns: result.columns
        }));
      })
      .then(tableAndColumns => {
        return request('GET', `${pimUrl}/tables/${tableId}/rows?offset=0&limit=${maxEntries}`).then(result => {
          const totalSize = result.page.totalSize;
          const elements = Math.ceil(totalSize / maxEntries);
          const requests = Array
            .apply(null, {length: elements - 1})
            .map((x, idx) => `${pimUrl}/tables/${tableId}/rows?offset=${(idx + 1) * maxEntries}&limit=${maxEntries}`);

          return requests.reduce((promise, requestUrl) => {
            return promise
              .then(tableColumnsAndRows => {
                return request('GET', requestUrl)
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
      })
  }
}

function request(requestMethod, url) {
  return new Promise(function (resolve, reject) {
    superagent(requestMethod, url)
      .end((error, response) => {
        if (!error && response.statusCode === 200) {
          resolve(response.body);
        } else {
          reject(error);
        }
      });
  });
}
