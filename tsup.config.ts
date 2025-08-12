import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  tsconfig: "./tsconfig.lib.json",
  external: ["react", "react-dom"],
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  target: "es2019"
})
