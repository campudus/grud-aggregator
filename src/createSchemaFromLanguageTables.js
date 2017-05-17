import _ from "lodash";

export function createSchemaFromLanguageTables(...fallbackLanguages) {
  // data is {"de":{...},"en":{...}, "en-US":{...}}
  return data => _.mapValues(data, (tables) => {
    const json = {};
    json.tables = _.transform(tables, (result, table, tableId) => {
      result[table.name] = table.displayName || getFromFallback(data, [tableId, "displayName"]);
    }, {});
    json.columns = _.transform(tables, (result, table, tableId) => {
      result[table.name] = _.transform(table.columns, (result, column, columnIndex) => {
        result[column.name] =
          column.displayName
          || getFromFallback(data, [tableId, "columns", columnIndex, "displayName"]);
      }, {});
    }, {});
    return json;
  });

  function getFromFallback(data, path) {
    const firstPossibleFallback = _.find(fallbackLanguages, lang => _.has(data, [lang].concat(path)));
    return _.get(data, [firstPossibleFallback].concat(path));
  }
}
