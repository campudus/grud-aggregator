'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.tablesToLanguages = tablesToLanguages;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function tablesToLanguages(langtags) {
  return function (tablesObj) {
    return _lodash2.default.reduce(langtags, function (acc, language) {
      return Object.assign(acc, _defineProperty({}, language, _lodash2.default.mapValues(tablesObj, function (table) {
        return {
          id: table.id,
          name: table.name,
          displayName: table.displayName[language],
          description: table.description[language],
          columns: _lodash2.default.flatMap(table.columns, function (c) {
            if (c.kind === 'concat') {
              return [];
            } else {
              var column = _extends({}, c, {
                displayName: c.displayName[language],
                description: c.description[language]
              });
              return [_lodash2.default.omit(column, ['toColumn', 'multilanguage'])];
            }
          }),
          rows: _lodash2.default.transform(table.rows, function (rows, row) {
            rows[row.id] = {
              values: _lodash2.default.flatMap(table.columns, function (c, index) {
                if (c.kind === 'concat') {
                  return [];
                } else if (c.kind === 'attachment') {
                  return [_lodash2.default.flatMap(row.values[index], function (cell) {
                    if (!_lodash2.default.isEmpty(cell.internalName[language])) {
                      // found an attachment in this language
                      return [_extends({}, cell, {
                        internalName: cell.internalName[language],
                        externalName: cell.externalName[language],
                        mimeType: cell.mimeType[language],
                        description: cell.description[language],
                        title: cell.title[language],
                        url: cell.url[language]
                      })];
                    } else if (_lodash2.default.size(cell.internalName) === 1) {
                      // if there is just one attachment, it counts for all
                      var fallback = Object.keys(cell.internalName)[0];
                      return _extends({}, cell, {
                        title: cell.title[language] || cell.title[fallback],
                        description: cell.description[language] || cell.description[fallback],
                        externalName: cell.externalName[language] || cell.externalName[fallback],
                        mimeType: cell.mimeType[fallback],
                        internalName: cell.internalName[fallback],
                        url: cell.url[fallback]
                      });
                    } else {
                      // no attachment found
                      return [];
                    }
                  })];
                } else if (c.kind === 'link') {
                  return [_lodash2.default.map(row.values[index], function (cell) {
                    return cell.id;
                  })];
                } else if (c.multilanguage && c.languageType === 'language') {
                  return [row.values[index][language]];
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
}