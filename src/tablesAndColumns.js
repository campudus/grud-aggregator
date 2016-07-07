import _ from 'lodash';

// FIXME fallbackLanguage should not be hardcoded
export function createLanguageJsonForTablesAndColumns(data) {
  // data is {'de':{...},'en':{...}, 'en-US':{...}}
  // fallback language is en
  const fallbackLanguage = 'en';
  return _.mapValues(data, (tables) => {
    const json = {};
    json.tables = _.transform(tables, (result, table, tableId) => {
      result[table.name] = table.displayName || _.get(data, [fallbackLanguage, tableId, 'displayName']);
    }, {});
    json.columns = _.transform(tables, (result, table, tableId) => {
      result[table.name] = _.transform(table.columns, (result, column, columnIndex) => {
        result[column.name] = column.displayName ||
          _.get(data, [
            fallbackLanguage,
            tableId,
            'columns',
            columnIndex,
            'displayName'
          ]);
      }, {});
    }, {});
    return json;
  });
}
