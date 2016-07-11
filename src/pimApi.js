import _ from 'lodash';
import superagent from 'superagent';

export function getAllTables(pimUrl) {
  return request('GET', `${pimUrl}/tables`).then(data => data.tables);
}

export function getTablesByNames(pimUrl, ...names) {
  return getAllTables(pimUrl)
    .then(tables => {
      console.log('found tables', tables);
      const filtered = _.filter(tables, t => _.some(names, name => t.name === name));
      console.log('filtered', filtered);
      return filtered;
    });
}

export function getCompleteTable(pimUrl, tableId) {
  return request('GET', `${pimUrl}/completetable/${tableId}`);
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
