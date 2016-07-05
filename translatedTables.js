import _ from 'lodash';

export default function tablesForLanguages(tablesObj, langtags) {
  return _.reduce(langtags, (acc, language) => Object.assign(acc, {
    [language] : _.mapValues(tablesObj, table => {
      return {
        id : table.id,
        name : table.name,
        displayName : table.displayName[language],
        description : table.description[language],
        columns : _.flatMap(table.columns, c => {
          if (c.kind === 'concat') {
            return [];
          } else {
            const column = {
              ...c,
              displayName : c.displayName[language],
              description : c.description[language]
            };
            return [_.omit(column, ['toColumn', 'multilanguage'])];
          }
        }),
        rows : _.transform(table.rows, (rows, row) => {
          rows[row.id] = _.flatMap(table.columns, (c, index) => {
            if (c.kind === 'concat') {
              return [];
            } else if (c.kind === 'attachment') {
              return [_.flatMap(row.values[index], cell => {
                if (!_.isEmpty(cell.internalName[language])) { // found an attachment in this language
                  return [{
                    ...cell,
                    internalName : cell.internalName[language],
                    externalName : cell.externalName[language],
                    mimeType : cell.mimeType[language],
                    description : cell.description[language],
                    title : cell.title[language],
                    url : cell.url[language]
                  }];
                } else if (_.size(cell.internalName) === 1) { // if there is just one attachment, it counts for all
                  const fallback = Object.keys(cell.internalName)[0];
                  return {
                    ...cell,
                    title : cell.title[language] || cell.title[fallback],
                    description : cell.description[language] || cell.description[fallback],
                    externalName : cell.externalName[language] || cell.externalName[fallback],
                    mimeType : cell.mimeType[fallback],
                    internalName : cell.internalName[fallback],
                    url : cell.url[fallback]
                  }
                } else { // no attachment found
                  return [];
                }
              })];
            } else if (c.kind === 'link') {
              return [_.map(row.values[index], cell => cell.id)];
            } else if (c.multilanguage && c.languageType === 'language') {
              return [row.values[index][language]];
            } else {
              return [row.values[index]];
            }
          });
        }, {})
      };
    })
  }), {});
}
