'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
    return _lodash2.default.filter(tables, function (t) {
      return _lodash2.default.some(names, function (name) {
        return t.name === name;
      });
    });
  });
}

function getCompleteTable(pimUrl, tableId, maxEntries) {
  return request('GET', pimUrl + '/tables/' + tableId).then(function (table) {
    var tableWithoutMeta = _lodash2.default.omit(table, ['status']);
    return request('GET', pimUrl + '/tables/' + tableId + '/columns').then(function (result) {
      return _extends({}, tableWithoutMeta, {
        columns: result.columns
      });
    });
  }).then(function (tableAndColumns) {
    return request('GET', pimUrl + '/tables/' + tableId + '/rows?offset=0&limit=' + maxEntries).then(function (result) {
      var totalSize = result.page.totalSize;
      var elements = Math.ceil(totalSize / maxEntries);
      var requests = Array.apply(null, { length: elements - 1 }).map(function (x, idx) {
        return pimUrl + '/tables/' + tableId + '/rows?offset=' + (idx + 1) * maxEntries + '&limit=' + maxEntries;
      });

      return requests.reduce(function (promise, requestUrl) {
        return promise.then(function (tableColumnsAndRows) {
          return request('GET', requestUrl).then(function (rowResult) {
            return _extends({}, tableColumnsAndRows, {
              rows: tableColumnsAndRows.rows.concat(rowResult.rows)
            });
          });
        });
      }, Promise.resolve(_extends({}, tableAndColumns, {
        rows: result.rows
      })));
    });
  });
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