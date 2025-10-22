import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: "src/index.d.ts",
    format: "esm",
    outDir: "dist",
    // we dont want bundling, because forked processes rely on folder structure
    unbundle: true,
    // https://tsdown.dev/options/dts#enabling-dts-generation
    // we write our own types, so we dont need dts generation
    dts: true
  },
  {
    entry: [
      "src/index.js",
      // forker and modifyImageProcess need separate entries,
      // because they are called as forked processes and are not imported directly
      "src/forker.js",
      "src/attachments/modifyImageProcess.js"
    ],
    // copy: [{ from: "src/**/*.d.ts", to: "dist" }],
    format: "esm",
    outDir: "dist",
    // we dont want bundling, because forked processes rely on folder structure
    unbundle: true,
    // https://tsdown.dev/options/dts#enabling-dts-generation
    // we write our own types, so we dont need dts generation
    dts: false
  },
  {
    entry: [
      "src/index.js",
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
    // we write our own types, so we dont need dts generation
    dts: false
  }
]);
