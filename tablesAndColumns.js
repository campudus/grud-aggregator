import _ from 'lodash';

export function createLanguageJsonForTablesAndColumns(data) {
  // data is {'de':{...},'en':{...}, 'en-US':{...}}
  // fallback language is en
  const fallbackLanguage = 'en';
  return _.mapValues(data, (tables) => {
    const json = {};
    json.tables = _.transform(tables, (result, table, tableId) => {
      const displayName = table.displayName || _.get(data, [fallbackLanguage, tableId, 'displayName']);
      result[table.name] = displayName;
    }, {});
    json.columns = _.transform(tables, (result, table, tableId) => {
      result[table.name] = _.transform(table.columns, (result, column, columnIndex) => {
        const displayName = column.displayName || _.get(data, [fallbackLanguage, tableId, 'columns', columnIndex, 'displayName']);
        result[column.name] = displayName;
      }, {});
    }, {});
    return json;
  });
}
