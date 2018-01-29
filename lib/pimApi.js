"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getAllTables = getAllTables;
exports.getTablesByNames = getTablesByNames;
exports.getCompleteTable = getCompleteTable;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _dns = require("dns");

var _dns2 = _interopRequireDefault(_dns);

var _requestPromiseNative = require("request-promise-native");

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAllTables(options) {
  var _getOptionsFromParam = getOptionsFromParam(options, "getAllTables"),
      pimUrl = _getOptionsFromParam.pimUrl,
      _getOptionsFromParam$ = _getOptionsFromParam.headers,
      headers = _getOptionsFromParam$ === undefined ? {} : _getOptionsFromParam$;

  return request("GET", pimUrl + "/tables", { headers: headers }).then(function (data) {
    return data.tables;
  });
}

function getTablesByNames(options) {
  for (var _len = arguments.length, names = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    names[_key - 1] = arguments[_key];
  }

  return getAllTables(getOptionsFromParam(options, "getTablesByNames")).then(function (tables) {
    return _lodash2.default.filter(tables, function (t) {
      return _lodash2.default.some(names, function (name) {
        return t.name === name;
      });
    });
  });
}

function getCompleteTable(options, tableId, maxEntries) {
  var _getOptionsFromParam2 = getOptionsFromParam(options, "getAllTables"),
      pimUrl = _getOptionsFromParam2.pimUrl,
      _getOptionsFromParam3 = _getOptionsFromParam2.headers,
      headers = _getOptionsFromParam3 === undefined ? {} : _getOptionsFromParam3;

  if (!_lodash2.default.isInteger(tableId) || tableId < 0) {
    throw new Error("Expecting tableId to be a positive integer greater than or equal 0");
  }

  if (!_lodash2.default.isInteger(maxEntries) || maxEntries <= 0) {
    throw new Error("Expecting maxEntriesPerRequest to be a positive integer greater than 0");
  }

  return request("GET", pimUrl + "/tables/" + tableId, { headers: headers }).then(function (table) {
    var tableWithoutMeta = _lodash2.default.omit(table, ["status"]);
    return request("GET", pimUrl + "/tables/" + tableId + "/columns", { headers: headers }).then(function (result) {
      return _extends({}, tableWithoutMeta, {
        columns: result.columns
      });
    });
  }).then(function (tableAndColumns) {
    return request("GET", pimUrl + "/tables/" + tableId + "/rows?offset=0&limit=" + maxEntries, { headers: headers }).then(function (result) {
      var totalSize = result.page.totalSize;
      var elements = Math.ceil(totalSize / maxEntries);
      var requests = createArrayOfRequests(pimUrl, tableId, maxEntries, elements);

      return requests.reduce(function (promise, requestUrl) {
        return promise.then(function (tableColumnsAndRows) {
          return request("GET", requestUrl, { headers: headers }).then(function (rowResult) {
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

function getOptionsFromParam(options, fnName) {
  if (_lodash2.default.isString(options)) {
    console.warn(fnName + "(pimUrl:string, ...) is deprecated. Use " + fnName + "(options:object, ...) with an options object like {pimUrl: \"http://...\"}");
    return { pimUrl: options };
  } else if (_lodash2.default.isPlainObject(options)) {
    if (_lodash2.default.isNil(options.pimUrl)) {
      throw new Error("Error in calling " + fnName + ". Required option \"pimUrl\" missing.");
    }
    if (!_lodash2.default.isString(options.pimUrl)) {
      throw new Error("Error in calling " + fnName + ". Expecting pimUrl to be a string.");
    }
    return options;
  } else {
    throw new Error("Error in calling " + fnName + ". Expected string or object but was " + (typeof options === "undefined" ? "undefined" : _typeof(options)));
  }
}

function createArrayOfRequests(pimUrl, tableId, maxEntries, elements) {
  var arr = [];
  for (var i = 0; i < elements - 1; i++) {
    arr.push(pimUrl + "/tables/" + tableId + "/rows?offset=" + (i + 1) * maxEntries + "&limit=" + maxEntries);
  }
  return arr;
}

function request(method, uri, options) {
  var headers = options.headers;


  return (0, _requestPromiseNative2.default)({
    method: method,
    uri: uri,
    headers: headers,
    family: 4,
    simple: true, // now the promise fails on status codes other than 2XX
    json: true
  });
}