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

function getTablesByNames(pimUrl, names) {
  return getAllTables(pimUrl).then(function (tables) {
    return _lodash2.default.filter(tables, function (t) {
      return _lodash2.default.some(names, function (name) {
        return t.name === name;
      });
    });
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