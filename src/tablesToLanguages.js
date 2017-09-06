import _ from "lodash";

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

export function tablesToLanguages(langtags, {fallbackOnly = false} = {}) {
  if (fallbackOnly && _.some(langtags, (value) => _.isEmpty(value))) {
    throw new Error("Missing values inside of language tag arrays.");
  }

  return tablesObj => _.reduce(langtags, (acc, fallbackLangTags, language) => Object.assign(acc, {
    [language]: _.mapValues(tablesObj, table => {
      const defaultLanguage = fallbackOnly ? fallbackLangTags[0] : language;
      const {id: tableId, name: tableName, description: tableDescription, columns, rows} = table;

      return {
        id: tableId,
        name: tableName,
        displayName: getDisplayName(table, defaultLanguage, fallbackLangTags),
        description: tableDescription[defaultLanguage],
        columns: _.flatMap(columns, column => {
          if (column.kind === "concat") {
            return [];
          }

          const updatedColumn = {
            ...column,
            displayName: getDisplayName(column, defaultLanguage, fallbackLangTags),
            description: column.description[defaultLanguage]
          };
          return [_.omit(updatedColumn, ["toColumn", "multilanguage"])];
        }),
        rows: _.transform(rows, (rows, row) => {

          rows[row.id] = {
            final: row.final || false,
            values: _.flatMap(columns, (column, index) => {
              const {kind, multilanguage, languageType} = column;
              const rowValue = row.values[index];

              if (kind === "concat") {
                return [];
              } else if (kind === "attachment") {
                return [
                  _.flatMap(rowValue, cell => {
                    if (!_.isEmpty(cell.internalName[defaultLanguage])) { // found an attachment in this language
                      return [
                        {
                          ...cell,
                          internalName: cell.internalName[defaultLanguage],
                          externalName: cell.externalName[defaultLanguage],
                          mimeType: cell.mimeType[defaultLanguage],
                          description: cell.description[defaultLanguage],
                          title: cell.title[defaultLanguage],
                          url: cell.url[defaultLanguage]
                        }
                      ];
                    } else if (_.size(cell.internalName) === 1) { // if there is just one attachment, it counts for all
                      const fallback = Object.keys(cell.internalName)[0];
                      return {
                        ...cell,
                        title: cell.title[defaultLanguage] || cell.title[fallback],
                        description: cell.description[defaultLanguage] || cell.description[fallback],
                        externalName: cell.externalName[defaultLanguage] || cell.externalName[fallback],
                        mimeType: cell.mimeType[fallback],
                        internalName: cell.internalName[fallback],
                        url: cell.url[fallback]
                      };
                    } else { // no attachment found
                      return [];
                    }
                  })
                ];
              } else if (kind === "link") {
                return [_.map(rowValue, cell => cell.id)];
              } else if (multilanguage && languageType === "language") {
                const value = rowValue[defaultLanguage];
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
