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

  let images = {
    bases: new Set<string>(),
    variants: new Set<string>(),
  };

  for (let object of await fs.readdir(options.directory)) {
    if (utils.isScaleVariant(object)) {
      images.variants.add(object);
    } else if (utils.isImage(object)) {
      images.bases.add(object);
    }
  }

  let imageVariants = new Map<
    string,
    { base: string; variants: Array<string> }
  >();
  for (let base of images.bases) {
    // let variants = Array.from(images.variants).filter((variant) =>
    //   variant.startsWith(base)
    // );
    // imageVariants.set(base, variants);
  }

  let result: CodegenResult = new Map();
}
