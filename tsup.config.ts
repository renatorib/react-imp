import { defineConfig, Options } from "tsup";

export default defineConfig([
  {
    dts: true,
    format: ["esm", "cjs"],
    sourcemap: true,
    clean: true,
    esbuildOptions: (options) => {
      options.banner = { js: '"use client";' };
    },
    entry: ["src"],
    outDir: "dist",
  },
]);
