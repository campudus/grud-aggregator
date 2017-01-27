'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAttachments = findAttachments;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findAttachments() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    withAttachment: false,
    withMapping: false
  },
      _ref$withAttachment = _ref.withAttachment,
      withAttachment = _ref$withAttachment === undefined ? false : _ref$withAttachment,
      _ref$withMapping = _ref.withMapping,
      withMapping = _ref$withMapping === undefined ? false : _ref$withMapping;

  return function (data) {
    return _lodash2.default.uniqBy(_lodash2.default.reduce(data, function (arr, table) {
      return arr.concat(_lodash2.default.flatMap(table.columns, function (col, index) {
        if (col.kind === 'attachment') {
          return _lodash2.default.flatMap(table.rows, function (row) {
            return _lodash2.default.flatMap(row.values[index], function (attachment) {
              return _lodash2.default.map(attachment.internalName, function (path, lang) {
                var att = {
                  url: attachment.url[lang],
                  path: path
                };
                if (withMapping) {
                  att.lang = lang;
                  att.internalName = path;
                  att.externalName = attachment.url[lang];
                }
                if (withAttachment) {
                  att.attachment = attachment;
                }
                return att;
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