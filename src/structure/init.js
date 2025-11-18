#!/usr/bin/env node
import fs from "node:fs/promises";
import { parseArgs } from "node:util";
import path from "node:path";
import prettier from "prettier";
import _ from "lodash";

const options = {
  url: { type: "string" },
  dir: { type: "string" }
};
const { values } = parseArgs({ options });
const { url, dir = "./" } = values;

const formatTS = (content) => prettier.format(content, { tabWidth: 2, parser: "typescript" });

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

const structureContent = await formatTS(
  `export type Structure = ${JSON.stringify(tables, null, 2)};

   type Prettify<T> = T extends object ? { [K in keyof T]: Prettify<T[K]> } : T;
  
   declare module "grud-aggregator" {
     export function getStructure(options?: {
       pimUrl?: string;
       headers?: Record<string, string>;
       timeout?: number;
     }): Promise<Prettify<Structure>>;
   }`
);

const structurePath = path.join(dir, "structure.d.ts");

await fs.writeFile(structurePath, structureContent);
