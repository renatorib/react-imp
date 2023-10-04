import { defineConfig } from "tsup";

export default defineConfig([
  {
    clean: true,
    format: ["cjs"],
    minify: true,
    entry: ["src/index.ts", "src/dialog.tsx"],
    outDir: "dist-test",
  },
]);
