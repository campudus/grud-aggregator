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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
  var includeArchived = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

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

  if (!_lodash.default.isBoolean(includeArchived)) {
    throw new Error("Expecting includeArchived to be a boolean");
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
    var queryString = generateQueryString({
      limit: maxEntries,
      archived: includeArchived
    });
    var url = "".concat(pimUrl, "/tables/").concat(tableId, "/rows?").concat(queryString);
    return request("GET", url, {
      headers: headers
    }).then(function (result) {
      var totalSize = result.page.totalSize;
      var elements = Math.ceil(totalSize / maxEntries);
      var requests = createArrayOfRequests(pimUrl, tableId, maxEntries, elements, includeArchived);
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

function createArrayOfRequests(pimUrl, tableId, maxEntries, elements, includeArchived) {
  var arr = [];

  for (var i = 0; i < elements - 1; i++) {
    var queryString = generateQueryString({
      offset: (i + 1) * maxEntries,
      limit: maxEntries,
      archived: includeArchived
    });
    var url = "".concat(pimUrl, "/tables/").concat(tableId, "/rows?").concat(queryString);
    arr.push(url);
  }

  return arr;
}

function generateQueryString(_ref) {
  var _ref$offset = _ref.offset,
      offset = _ref$offset === void 0 ? 0 : _ref$offset,
      limit = _ref.limit,
      archived = _ref.archived;
  return _lodash.default.toPairs(_lodash.default.omitBy({
    offset: offset,
    limit: limit,
    archived: archived ? undefined : false
  }, _lodash.default.isNil)).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        key = _ref3[0],
        value = _ref3[1];

    return "".concat(key, "=").concat(value);
  }).join("&");
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