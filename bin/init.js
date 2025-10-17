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

const formatTS = (content) => prettier.format(content, { tabWidth: 2, parser: "typescript" });

const tablesContent = await formatTS(
  `const tables = ${JSON.stringify(_.keyBy(tables, "name"), null, 2)} as const;`
);

const dirPath = path.join(dir, ".grud-aggregator");
const structurePathSource = path.join(import.meta.dirname, "structure.d.ts");
const structurePathTarget = path.join(dirPath, "structure.d.ts");
const structureTemplate = await fs.readFile(structurePathSource, "utf8");
const structureContent = await formatTS(`\n${tablesContent}\n\n${structureTemplate}`);

await fs.mkdir(dirPath, { recursive: true });
await fs.writeFile(structurePathTarget, structureContent);
