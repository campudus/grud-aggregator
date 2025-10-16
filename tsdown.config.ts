import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: [
      "src/index.ts",
      // forker and modifyImageProcess need separate entries,
      // because they are called as forked processes and are not imported directly
      "src/forker.js",
      "src/attachments/modifyImageProcess.js"
    ],
    format: "esm",
    outDir: "dist",
    // we dont want bundling, because forked processes rely on folder structure
    unbundle: true,
    // https://tsdown.dev/options/dts#enabling-dts-generation
    // we build cjs and esm separately, so we only generate dts once for esm
    dts: true
  },
  {
    entry: [
      "src/index.ts",
      // forker and modifyImageProcess need separate entries,
      // because they are called as forked processes and are not imported directly
      "src/forker.js",
      "src/attachments/modifyImageProcess.js"
    ],
    format: "cjs",
    outDir: "dist",
    // we dont want bundling, because forked processes rely on folder structure
    unbundle: true,
    // https://tsdown.dev/options/dts#enabling-dts-generation
    // we build cjs and esm separately, so we only generate dts once for esm
    dts: false
  }
]);
