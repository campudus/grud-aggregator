import fs from "node:fs/promises";
import { parseArgs } from "node:util";
import path from "node:path";
import { getEntitiesOfTable } from "../src/entities.js";
import { referencer } from "../src/referencer/referencer.js";
import { tablesToLanguages } from "../src/tablesToLanguages.js";

const options = {
  url: { type: "string" },
  table: { type: "string" },
  dir: { type: "string" }
};
const { values } = parseArgs({ options });
const { url, table, dir = "./" } = values;

if (!url) {
  throw new Error("argument 'url' is missing");
}

if (!table) {
  throw new Error("argument 'table' is missing");
}

export const LANG_TAGS_WITH_FALLBACK = {
  de: ["de", "en"],
  ch: ["ch", "de"],
  en: ["en", "de"],
  fr: ["fr", "en", "de"],
  it: ["it", "en", "de"],
  es: ["es", "en", "de"],
  nl: ["nl", "en", "de"],
  pl: ["pl", "en", "de"],
  cs: ["cs", "en", "de"],
  dk: ["dk", "en", "de"],
  fi: ["fi", "en", "de"],
  se: ["se", "en", "de"]
};

const entities = await getEntitiesOfTable(table, { pimUrl: url });
const localized = await tablesToLanguages(LANG_TAGS_WITH_FALLBACK)(entities);
const referenced = await referencer({ withLanguages: true })(localized);

const dirPath = path.join(dir, ".grud-aggregator", table);
const entititiesTarget = path.join(dirPath, "entities.json");
const localizedTarget = path.join(dirPath, "localized.json");
const referencedTarget = path.join(dirPath, "referenced.json");

await fs.mkdir(dirPath, { recursive: true });
await fs.writeFile(entititiesTarget, JSON.stringify(entities, null, 2));
await fs.writeFile(localizedTarget, JSON.stringify(localized, null, 2));
await fs.writeFile(referencedTarget, JSON.stringify(referenced, null, 2));
