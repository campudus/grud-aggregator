import _ from "lodash";

export function findAttachments(
  {
    withAttachment = false,
    withMapping = false
  } = {
    withAttachment: false,
    withMapping: false
  }) {

  return data => {
    return _.uniqBy(_.reduce(data, (arr, table) => {
      return arr.concat(_.flatMap(table.columns, (col, index) => {
        if (col.kind === "attachment") {
          return _.flatMap(table.rows, row => {
            return _.flatMap(row.values[index], attachment => {
              return _.map(attachment.internalName, (path, lang) => {
                const att = {
                  url: attachment.url[lang],
                  path
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
    }, []), "url");
  };

}
