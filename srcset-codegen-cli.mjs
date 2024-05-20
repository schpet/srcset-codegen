#!/usr/bin/env node

// @ts-check
import { Clerc } from "clerc";
import { promises as fs } from "fs";
import * as path from "path";
import imageSize from "image-size";
import camelCase from "camelcase";

// FYI this code is the junk that chatgpt outputs :D

Clerc.create()
  .scriptName("srcset-codegen")
  .description("Generates srcset")
  .version("1.0.0")
  .command("generate", "Generate command", { parameters: ["<path...>"] })
  .on("generate", async (context) => {
    let paths = context.parameters.path.map((p) => path.resolve(p));

    let allFiles = [];

    for (let dir of paths) {
      let entries = await fs.readdir(dir);
      for (let entry of entries) {
        let file = path.resolve(dir, entry);
        let stats = await fs.lstat(file);
        let isInGenerated = file.includes("__generated__");

        if (stats.isFile() && !isInGenerated) {
          allFiles.push(file);
        }
      }
    }

    let groups = allFiles.reduce((groups, file) => {
      const { base, name } = path.parse(file);
      // @ts-expect-error shrug
      let [, basename, suffix] = name.match(/^(.*?)(@\dx)?$/);
      (groups[basename] = groups[basename] || []).push({ file, base, suffix });
      return groups;
    }, {});

    for (let [name, variants] of Object.entries(groups)) {
      let variantSrcs = variants.map(
        (variant) =>
          `import ${suffixToName(variant.suffix)} from "../${variant.base}"`
      );
      let sizes = imageSize(variants.find((v) => !v.suffix).file);
      let srcSet = variants
        .filter((v) => v.suffix)
        .map((v) => `\${${suffixToName(v.suffix)}} ${suffixToSize(v.suffix)}`)
        .join(", ");

      const exportName = camelCase(name);

      let output = [
        ...variantSrcs,
        `const width = ${sizes.width}`,
        `const height = ${sizes.height}`,
        `export const ${exportName} = { src, srcSet: \`${srcSet}\`, width, height }`,
        "",
      ];

      const directoryPath = path.join(
        context.parameters.path[0],
        "__generated__"
      );

      await fs.mkdir(directoryPath, { recursive: true });
      await fs.writeFile(
        path.join(directoryPath, `${name}.ts`),
        output.join("\n")
      );
    }
  })
  .parse();

function suffixToName(suffix) {
  // converts a suffix like '@2x' to a name like 'src2x'
  return suffix ? `src${suffix.slice(1)}` : "src";
}

function suffixToSize(suffix) {
  return suffix ? suffix.slice(1) : "1x";
}
