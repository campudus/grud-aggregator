import _ from "lodash";

import { ById, ByLangTag, Table } from "./types/createSchemaFromLanguageTables";

export function createSchemaFromLanguageTables(...fallbackLanguages: string[]) {
  // data is {"de":{...},"en":{...}, "en-US":{...}}
  return (data: ByLangTag<ById<Table>>) =>
    _.mapValues(data, (tables) => {
      const json: any = {};
      json.tables = _.transform(
        tables,
        (result, table, tableId) => {
          result[table.name] = table.displayName || getFromFallback(data, [tableId, "displayName"]);
        },
        {}
      );
      json.columns = _.transform(
        tables,
        (result, table, tableId) => {
          result[table.name] = _.transform(
            table.columns,
            (result, column, columnIndex) => {
              result[column.name] =
                column.displayName ||
                getFromFallback(data, [tableId, "columns", columnIndex, "displayName"]);
            },
            {}
          );
        },
        {}
      );
      return json;
    });

  function getFromFallback(data: ByLangTag<ById<Table>>, path: (string | number)[]) {
    const firstPossibleFallback = _.find(fallbackLanguages, (lang) =>
      _.has(data, _.concat([lang], path))
    );
    return _.get(data, _.concat([firstPossibleFallback], path));
  }
}
