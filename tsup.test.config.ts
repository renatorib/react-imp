import { defineConfig } from "tsup";

export default defineConfig([
  {
    clean: true,
    format: ["cjs"],
    minify: true,
    entry: ["src/test.tsx"],
    outDir: "dist-test",
  },
]);
