import { defineConfig } from "tsdown";

export default defineConfig({
  entry: [
    "src/index.ts",
    // modifyImageProcess needs a separate entry,
    // because it is called as a forked process and is not imported directly
    "src/attachments/modifyImageProcess.js"
  ],
  // we dont want bundling, because we have binary dependencies (sharp) which cant be bundled anyway
  unbundle: true,
  // https://tsdown.dev/options/dts#enabling-dts-generation
  // if your package.json contains a types or typings field,
  // declaration file generation will be enabled by default in tsdown.
  // we build cjs and esm separately, so we disable dts generation here,
  // and trigger dts generation once manually via cli
  dts: false,
  // use same extension (.js) for esm and cjs
  // because we use separate output directories "dist/cjs/"" and "dist/esm/"
  outExtensions: () => ({ js: ".js", dts: ".d.ts" })
});
