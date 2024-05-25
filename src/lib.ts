import { promises as fs } from "node:fs";
import * as utils from "./utils";
import { parse } from "node:path";

type GenerateOptions = {
  directory: string;
};

type CodegenResult = Map<string, string>;

export async function generate(
  options: GenerateOptions
): Promise<CodegenResult> {
  console.log("Generating srcset in dirx: ", options.directory);

  let bases = new Set<string>();
  let variants = new Set<string>();

  for (let object of await fs.readdir(options.directory)) {
    if (utils.isScaleVariant(object)) {
      variants.add(object);
    } else if (utils.isImage(object)) {
      bases.add(object);
    }
  }

  let uniqBases = utils.uniqNames(bases);

  let imageVariants = new Map<
    string,
    { base: string; variants: Array<string> }
  >();

  for (let base of uniqBases) {
    // example base: foo.png or sd/foo.png
    // example variants: foo@2x.png, sd/foo@2x.png etc
    let variantsForBase = Array.from(variants).filter((variant) => {
  }

  let result: CodegenResult = new Map();
  return result;
}
