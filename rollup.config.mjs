// @ts-check
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/cli.ts",
  output: [
    {
      dir: "./",
      entryFileNames: "dist/cli.js",
      format: "cjs",
    },
  ],
  plugins: [typescript(), commonjs()],
};
