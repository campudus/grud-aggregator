"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllTables = getAllTables;
exports.getCompleteTable = getCompleteTable;
exports.getTablesByNames = getTablesByNames;
var _abortController = _interopRequireDefault(require("abort-controller"));
var _lodash = _interopRequireDefault(require("lodash"));
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function getAllTables(options) {
  var _getOptionsFromParam = getOptionsFromParam(options, "getAllTables"),
    pimUrl = _getOptionsFromParam.pimUrl,
    headers = _getOptionsFromParam.headers,
    timeout = _getOptionsFromParam.timeout;
  return request("".concat(pimUrl, "/tables"), {
    headers: headers,
    timeout: timeout
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
function getCompleteTable(options, tableId, maxEntries, archived) {
  var _getOptionsFromParam2 = getOptionsFromParam(options, "getAllTables"),
    pimUrl = _getOptionsFromParam2.pimUrl,
    headers = _getOptionsFromParam2.headers,
    timeout = _getOptionsFromParam2.timeout;
  if (!_lodash.default.isInteger(tableId) || tableId < 0) {
    throw new Error("Expecting tableId to be a positive integer greater than or equal 0");
  }
  if (!_lodash.default.isInteger(maxEntries) || maxEntries <= 0) {
    throw new Error("Expecting maxEntriesPerRequest to be a positive integer greater than 0");
  }
  if (!_lodash.default.isNil(archived) && !_lodash.default.isBoolean(archived)) {
    throw new Error("Expecting archived to be a boolean");
  }
  return request("".concat(pimUrl, "/tables/").concat(tableId), {
    headers: headers,
    timeout: timeout
  }).then(function (table) {
    var tableWithoutMeta = _lodash.default.omit(table, ["status"]);
    return request("".concat(pimUrl, "/tables/").concat(tableId, "/columns"), {
      headers: headers,
      timeout: timeout
    }).then(function (result) {
      return _objectSpread(_objectSpread({}, tableWithoutMeta), {}, {
        columns: result.columns
      });
    });
  }).then(function (tableAndColumns) {
    var queryString = generateQueryString({
      limit: maxEntries,
      archived: archived
    });
    var url = "".concat(pimUrl, "/tables/").concat(tableId, "/rows?").concat(queryString);
    return request(url, {
      headers: headers,
      timeout: timeout
    }).then(function (result) {
      var totalSize = result.page.totalSize;
      var elements = Math.ceil(totalSize / maxEntries);
      var requests = createArrayOfRequests(pimUrl, tableId, maxEntries, elements, archived);
      return requests.reduce(function (promise, requestUrl) {
        return promise.then(function (tableColumnsAndRows) {
          return request(requestUrl, {
            headers: headers,
            timeout: timeout
          }).then(function (rowResult) {
            return _objectSpread(_objectSpread({}, tableColumnsAndRows), {}, {
              rows: tableColumnsAndRows.rows.concat(rowResult.rows)
            });
          });
        });
      }, Promise.resolve(_objectSpread(_objectSpread({}, tableAndColumns), {}, {
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
function createArrayOfRequests(pimUrl, tableId, maxEntries, elements, archived) {
  var arr = [];
  for (var i = 0; i < elements - 1; i++) {
    var queryString = generateQueryString({
      offset: (i + 1) * maxEntries,
      limit: maxEntries,
      archived: archived
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
    archived: archived
  }, _lodash.default.isNil)).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      key = _ref3[0],
      value = _ref3[1];
    return "".concat(key, "=").concat(value);
  }).join("&");
}
function fetchWithTimeout(_x) {
  return _fetchWithTimeout.apply(this, arguments);
}
function _fetchWithTimeout() {
  _fetchWithTimeout = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(url) {
    var options,
      timeoutMs,
      controller,
      timeout,
      response,
      json,
      _args = arguments,
      _t,
      _t2;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
          timeoutMs = _args.length > 2 ? _args[2] : undefined;
          controller = new _abortController.default();
          timeout = timeoutMs ? setTimeout(function () {
            return controller.abort();
          }, timeoutMs) : null;
          _context.p = 1;
          _context.n = 2;
          return (0, _nodeFetch.default)(url, _objectSpread(_objectSpread({}, options), {}, {
            signal: controller.signal
          }));
        case 2:
          response = _context.v;
          clearTimeout(timeout);
          _context.p = 3;
          _context.n = 4;
          return response.json();
        case 4:
          json = _context.v;
          _context.n = 6;
          break;
        case 5:
          _context.p = 5;
          _t = _context.v;
          json = {};
        case 6:
          return _context.a(2, json);
        case 7:
          _context.p = 7;
          _t2 = _context.v;
          clearTimeout(timeout);
          if (!(_t2.type === "aborted")) {
            _context.n = 8;
            break;
          }
          throw new Error("Request timed out after ".concat(timeoutMs, "ms."));
        case 8:
          throw _t2;
        case 9:
          return _context.a(2);
      }
    }, _callee, null, [[3, 5], [1, 7]]);
  }));
  return _fetchWithTimeout.apply(this, arguments);
}
function request(url, _ref4) {
  var headers = _ref4.headers,
    timeout = _ref4.timeout;
  return fetchWithTimeout(url, {
    method: "GET",
    headers: headers
  }, timeout);
}