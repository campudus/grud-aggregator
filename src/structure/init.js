#!/usr/bin/env node
import fs from "node:fs/promises";
import { parseArgs } from "node:util";
import path from "node:path";
import prettier from "prettier";
import _ from "lodash";

const options = {
  plain: { type: "boolean" },
  url: { type: "string" },
  dir: { type: "string" }
};
const { values } = parseArgs({ options });
const { plain = false, url, dir = "./" } = values;

const formatTS = (content) =>
  prettier.format(content, { tabWidth: 2, parser: "typescript" });

if (plain) {
  const structureContent = await formatTS(
    `declare module "grud-aggregator/structure" {
      export type Structure = {
        [tableName: string]: {
          id: number;
          name: string;
          langtags: string[];
          columns: {
            [columnName: string]: {
              id: number;
              index: number;
              name: string;
              kind: string;
              multilanguage: boolean;
              languageType: string;
            };
          };
        };
      };
    }`
  );

  const structurePath = path.join(dir, "structure.d.ts");

  await fs.writeFile(structurePath, structureContent);
} else {
  if (!url) {
    throw new Error("argument 'url' is missing");
  }

  const structureResponse = await fetch(`${url}/structure`);
  const { tables } = await structureResponse.json();

  // cleanup structure
  const cleanColumn = (col, columnIndex) => {
    if (_.isNumber(columnIndex)) {
      col.index = columnIndex;
    }

    delete col.displayName;
    delete col.ordering;
    delete col.identifier;
    delete col.description;
    delete col.attributes;
    delete col.separator;
    delete col.hidden;

    if (col.toColumn) {
      cleanColumn(col.toColumn);
    }

    col.concats?.forEach(cleanColumn);
    col.groups?.forEach(cleanColumn);
  };

  for (const table of tables) {
    delete table.displayName;
    delete table.description;
    delete table.attributes;
    delete table.group;
    delete table.hidden;

    table.columns?.forEach(cleanColumn);
  }

  // format
  for (const table of tables) {
    table.columns = _.keyBy(table.columns, "name");
  }

  const structureContent = await formatTS(
    `declare module "grud-aggregator/structure" {
      export type Structure = ${JSON.stringify(_.keyBy(tables, "name"), null, 2)};
    }`
  );

  const structurePath = path.join(dir, "structure.d.ts");

  await fs.writeFile(structurePath, structureContent);
}
