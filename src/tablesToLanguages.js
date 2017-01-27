import _ from 'lodash';

function getDisplayName(tableOrColumn, langTag, fallbackLangTags) {
  const displayNames = tableOrColumn.displayName;
  const displayName = displayNames[langTag];

  if (!_.isNil(displayName)) {
    return displayName;
  }

  const fallbackLangTag = _.find(fallbackLangTags, langTag => !_.isNil(displayNames[langTag]));

  if (fallbackLangTag) {
    return displayNames[fallbackLangTag];
  }

  return displayName;
}

export function tablesToLanguages(langtags) {
  return tablesObj => _.reduce(langtags, (acc, fallbackLangTags, language) => Object.assign(acc, {
    [language] : _.mapValues(tablesObj, table => {
      const {id : tableId, name : tableName, description : tableDescription, columns, rows} = table;

      return {
        id : tableId,
        name : tableName,
        displayName : getDisplayName(table, language, fallbackLangTags),
        description : tableDescription[language],
        columns : _.flatMap(columns, column => {
          if (column.kind === 'concat') {
            return [];
          }

          const updatedColumn = {
            ...column,
            displayName : getDisplayName(column, language, fallbackLangTags),
            description : column.description[language]
          };
          return [_.omit(updatedColumn, ['toColumn', 'multilanguage'])];
        }),
        rows : _.transform(rows, (rows, row) => {
          rows[row.id] = {
            values : _.flatMap(columns, (column, index) => {
              const {kind, multilanguage, languageType} = column;
              const rowValue = row.values[index];

              if (kind === 'concat') {
                return [];
              } else if (kind === 'attachment') {
                return [_.flatMap(rowValue, cell => {
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
                    };
                  } else { // no attachment found
                    return [];
                  }
                })];
              } else if (kind === 'link') {
                return [_.map(rowValue, cell => cell.id)];
              } else if (multilanguage && languageType === 'language') {
                const value = rowValue[language];
                if (_.isNil(value)) {
                  const fallbackLangTag = _.find(fallbackLangTags, langTag => !_.isNil(rowValue[langTag]));
                  const fallbackValue = fallbackLangTag ? rowValue[fallbackLangTag] : value;
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
    })
  }), {});
}
