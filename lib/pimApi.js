"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllTables = getAllTables;
exports.getTablesByNames = getTablesByNames;
exports.getCompleteTable = getCompleteTable;

var _lodash = _interopRequireDefault(require("lodash"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getAllTables(options) {
  var _getOptionsFromParam = getOptionsFromParam(options, "getAllTables"),
      pimUrl = _getOptionsFromParam.pimUrl,
      _getOptionsFromParam$ = _getOptionsFromParam.headers,
      headers = _getOptionsFromParam$ === void 0 ? {} : _getOptionsFromParam$;

  return request("GET", "".concat(pimUrl, "/tables"), {
    headers: headers
  }).then(function (data) {
    return data.tables;
  });
}

function getTablesByNames(options) {
  for (var _len = arguments.length, names = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    names[_key - 1] = arguments[_key];
  }

  return getAllTables(getOptionsFromParam(options, "getTablesByNames")).then(function (tables) {
    return _lodash.default.filter(tables, function (t) {
      return _lodash.default.some(names, function (name) {
        return t.name === name;
      });
    });
  });
}

function getCompleteTable(options, tableId, maxEntries) {
  var _getOptionsFromParam2 = getOptionsFromParam(options, "getAllTables"),
      pimUrl = _getOptionsFromParam2.pimUrl,
      _getOptionsFromParam3 = _getOptionsFromParam2.headers,
      headers = _getOptionsFromParam3 === void 0 ? {} : _getOptionsFromParam3;

  if (!_lodash.default.isInteger(tableId) || tableId < 0) {
    throw new Error("Expecting tableId to be a positive integer greater than or equal 0");
  }

  if (!_lodash.default.isInteger(maxEntries) || maxEntries <= 0) {
    throw new Error("Expecting maxEntriesPerRequest to be a positive integer greater than 0");
  }

  return request("GET", "".concat(pimUrl, "/tables/").concat(tableId), {
    headers: headers
  }).then(function (table) {
    var tableWithoutMeta = _lodash.default.omit(table, ["status"]);

    return request("GET", "".concat(pimUrl, "/tables/").concat(tableId, "/columns"), {
      headers: headers
    }).then(function (result) {
      return _objectSpread({}, tableWithoutMeta, {
        columns: result.columns
      });
    });
  }).then(function (tableAndColumns) {
    return request("GET", "".concat(pimUrl, "/tables/").concat(tableId, "/rows?offset=0&limit=").concat(maxEntries), {
      headers: headers
    }).then(function (result) {
      var totalSize = result.page.totalSize;
      var elements = Math.ceil(totalSize / maxEntries);
      var requests = createArrayOfRequests(pimUrl, tableId, maxEntries, elements);
      return requests.reduce(function (promise, requestUrl) {
        return promise.then(function (tableColumnsAndRows) {
          return request("GET", requestUrl, {
            headers: headers
          }).then(function (rowResult) {
            return _objectSpread({}, tableColumnsAndRows, {
              rows: tableColumnsAndRows.rows.concat(rowResult.rows)
            });
          });
        });
      }, Promise.resolve(_objectSpread({}, tableAndColumns, {
        rows: result.rows
      })));
    });
  });
}

function getOptionsFromParam(options, fnName) {
  if (_lodash.default.isString(options)) {
    console.warn("".concat(fnName, "(pimUrl:string, ...) is deprecated. Use ").concat(fnName, "(options:object, ...) with an options object like {pimUrl: \"http://...\"}"));
    return {
      pimUrl: options
    };
  } else if (_lodash.default.isPlainObject(options)) {
    if (_lodash.default.isNil(options.pimUrl)) {
      throw new Error("Error in calling ".concat(fnName, ". Required option \"pimUrl\" missing."));
    }

    if (!_lodash.default.isString(options.pimUrl)) {
      throw new Error("Error in calling ".concat(fnName, ". Expecting pimUrl to be a string."));
    }

    return options;
  } else {
    throw new Error("Error in calling ".concat(fnName, ". Expected string or object but was ").concat(_typeof(options)));
  }
}

function createArrayOfRequests(pimUrl, tableId, maxEntries, elements) {
  var arr = [];

  for (var i = 0; i < elements - 1; i++) {
    arr.push("".concat(pimUrl, "/tables/").concat(tableId, "/rows?offset=").concat((i + 1) * maxEntries, "&limit=").concat(maxEntries));
  }

  return arr;
}

function request(method, url, options) {
  var headers = options.headers;
  return (0, _axios.default)({
    method: method,
    url: url,
    headers: headers
  }).then(function (res) {
    return res.data;
  });
}