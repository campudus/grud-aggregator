'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllTables = getAllTables;
exports.getTablesByNames = getTablesByNames;
exports.getCompleteTable = getCompleteTable;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAllTables(pimUrl) {
  return request('GET', pimUrl + '/tables').then(function (data) {
    return data.tables;
  });
}

function getTablesByNames(pimUrl) {
  for (var _len = arguments.length, names = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    names[_key - 1] = arguments[_key];
  }

  return getAllTables(pimUrl).then(function (tables) {
    console.log('found tables', tables);
    var filtered = _lodash2.default.filter(tables, function (t) {
      return _lodash2.default.some(names, function (name) {
        return t.name === name;
      });
    });
    console.log('filtered', filtered);
    return filtered;
  });
}

function getCompleteTable(pimUrl, tableId) {
  return request('GET', pimUrl + '/completetable/' + tableId);
}

function request(requestMethod, url) {
  return new Promise(function (resolve, reject) {
    (0, _superagent2.default)(requestMethod, url).end(function (error, response) {
      if (!error && response.statusCode === 200) {
        resolve(response.body);
      } else {
        reject(error);
      }
    });
  });
}