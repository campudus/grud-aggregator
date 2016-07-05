import _ from 'lodash';
import superagent from 'superagent';
import serialize from 'serialize-javascript';

export function getAllTables(pimUrl) {
  return request('GET', `${pimUrl}/tables`).then(data => data.tables);
}

export function getTableByName(pimUrl, name) {
  return getAllTables(pimUrl)
    .then(tables => _.find(tables, t => t.name === name));
}

export function getCompleteTable(pimUrl, tableId) {
  return request('GET', `${pimUrl}/completetable/${tableId}`);
}

function request(requestMethod, url) {
  return new Promise(function (resolve, reject) {
    superagent(requestMethod, url)
      .end((error, response) => {
        if (!error && response.statusCode == 200) {
          resolve(response.body);
        } else {
          reject(error);
        }
      });
  });
}
