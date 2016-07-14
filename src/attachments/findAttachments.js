import _ from 'lodash';

export function findAttachments() {
  return data => {
    return _.uniqBy(_.reduce(data, (arr, table) => {
      return arr.concat(_.flatMap(table.columns, (col, index) => {
        if (col.kind === 'attachment') {
          return _.flatMap(table.rows, row => {
            return _.flatMap(row.values[index], attachment => {
              return _.map(attachment.internalName, (path, lang) => {
                return {
                  url : attachment.url[lang],
                  path
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
