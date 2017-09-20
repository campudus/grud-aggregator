"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.tablesToLanguages = tablesToLanguages;

var _lodash = require("lodash");

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      fallbackOnly = _ref$fallbackOnly === undefined ? false : _ref$fallbackOnly,
      _ref$fallbackOnEmptyS = _ref.fallbackOnEmptyString,
      fallbackOnEmptyString = _ref$fallbackOnEmptyS === undefined ? true : _ref$fallbackOnEmptyS;

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

            var updatedColumn = _extends({}, column, {
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
                      return [_extends({}, cell, {
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
                      return _extends({}, cell, {
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