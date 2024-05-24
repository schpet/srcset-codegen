// @ts-check
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/cli.ts",
  output: [
    {
      dir: "./",
      entryFileNames: "dist/cli.cjs",
      format: "cjs",
    },
  ],
  plugins: [typescript(), resolve(), commonjs()],
};
