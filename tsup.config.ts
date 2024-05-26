import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/cli.ts"],
  minify: false,
  splitting: true,
  clean: true,
  format: ["esm"],
  dts: false,
  banner: {
    js: "#!/usr/bin/env node\n",
  },
});
