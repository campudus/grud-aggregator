'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAttachments = findAttachments;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findAttachments() {
  return function (data) {
    return _lodash2.default.uniqBy(_lodash2.default.reduce(data, function (arr, table) {
      return arr.concat(_lodash2.default.flatMap(table.columns, function (col, index) {
        if (col.kind === 'attachment') {
          return _lodash2.default.flatMap(table.rows, function (row) {
            return _lodash2.default.flatMap(row.values[index], function (attachment) {
              return _lodash2.default.map(attachment.internalName, function (path, lang) {
                return {
                  url: attachment.url[lang],
                  path: path
                };
              });
            });
          });
        } else {
          return [];
        }
      }));
    }, []), 'url');
  };
}