"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tablesToLanguages = tablesToLanguages;
var _ = _interopRequireWildcard(require("lodash"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function getDisplayName(tableOrColumn, langTag, fallbackLangTags) {
  var displayNames = tableOrColumn.displayName;
  var displayName = displayNames[langTag];
  if (!_.isNil(displayName)) {
    return displayName;
  }
  var fallbackLangTag = _.find(fallbackLangTags, function (langTag) {
    return !_.isNil(displayNames[langTag]);
  });
  if (fallbackLangTag) {
    return displayNames[fallbackLangTag];
  }
  return displayName;
}
function tablesToLanguages(langtags) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$fallbackOnly = _ref.fallbackOnly,
    fallbackOnly = _ref$fallbackOnly === void 0 ? false : _ref$fallbackOnly,
    _ref$fallbackOnEmptyS = _ref.fallbackOnEmptyString,
    fallbackOnEmptyString = _ref$fallbackOnEmptyS === void 0 ? true : _ref$fallbackOnEmptyS;
  if (fallbackOnly && _.some(langtags, function (value) {
    return _.isEmpty(value);
  })) {
    throw new Error("Missing values inside of language tag arrays.");
  }
  return function (tablesObj) {
    return _.reduce(langtags, function (acc, fallbackLangTags, language) {
      return Object.assign(acc, _defineProperty({}, language, _.mapValues(tablesObj, function (table) {
        var defaultLanguage = fallbackOnly ? fallbackLangTags[0] : language;
        var tableId = table.id,
          tableName = table.name,
          tableDescription = table.description,
          columns = table.columns,
          rows = table.rows;
        return {
          id: tableId,
          name: tableName,
          displayName: getDisplayName(table, defaultLanguage, fallbackLangTags),
          description: tableDescription[defaultLanguage],
          columns: _.flatMap(columns, function (column) {
            if (column.kind === "concat") {
              return [];
            }
            var updatedColumn = _objectSpread(_objectSpread({}, column), {}, {
              displayName: getDisplayName(column, defaultLanguage, fallbackLangTags),
              description: column.description[defaultLanguage]
            });
            return [_.omit(updatedColumn, ["toColumn", "multilanguage"])];
          }),
          rows: _.transform(rows, function (rows, row) {
            rows[row.id] = {
              final: row.final || false,
              values: _.flatMap(columns, function (column, index) {
                var kind = column.kind,
                  multilanguage = column.multilanguage,
                  languageType = column.languageType;
                var rowValue = row.values[index];
                if (kind === "concat") {
                  return [];
                } else if (kind === "attachment") {
                  return [_.flatMap(rowValue, function (cell) {
                    if (!_.isEmpty(cell.internalName[defaultLanguage])) {
                      // found an attachment in this language
                      return [_objectSpread(_objectSpread({}, cell), {}, {
                        internalName: cell.internalName[defaultLanguage],
                        externalName: cell.externalName[defaultLanguage],
                        mimeType: cell.mimeType[defaultLanguage],
                        description: cell.description[defaultLanguage],
                        title: cell.title[defaultLanguage],
                        url: cell.url[defaultLanguage]
                      })];
                    } else if (_.size(cell.internalName) === 1) {
                      // if there is just one attachment, it counts for all
                      var fallback = Object.keys(cell.internalName)[0];
                      return _objectSpread(_objectSpread({}, cell), {}, {
                        title: cell.title[defaultLanguage] || cell.title[fallback],
                        description: cell.description[defaultLanguage] || cell.description[fallback],
                        externalName: cell.externalName[defaultLanguage] || cell.externalName[fallback],
                        mimeType: cell.mimeType[fallback],
                        internalName: cell.internalName[fallback],
                        url: cell.url[fallback]
                      });
                    } else {
                      // no attachment found
                      return [];
                    }
                  })];
                } else if (kind === "link") {
                  return [_.map(rowValue, function (cell) {
                    return cell.id;
                  })];
                } else if (multilanguage && languageType === "language") {
                  var value = rowValue[defaultLanguage];
                  if (needsFallback(kind, value)) {
                    var fallbackLangTag = _.find(fallbackLangTags, function (langTag) {
                      return !needsFallback(kind, rowValue[langTag]);
                    });
                    var fallbackValue = fallbackLangTag ? rowValue[fallbackLangTag] : value;
                    return [fallbackValue];
                  } else {
                    return [value];
                  }
                } else {
                  return [row.values[index]];
                }
              })
            };
          }, {})
        };
      })));
    }, {});
  };
  function needsFallback(kind, value) {
    var isString = _.endsWith(kind, "text");
    return fallbackOnEmptyString && isString ? _.trim(value).length === 0 : _.isNil(value);
  }
}