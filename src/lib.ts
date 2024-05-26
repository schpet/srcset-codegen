import { promises as fs } from "node:fs";
import * as utils from "./utils";
import { join, parse } from "node:path";

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
    let path = join(options.directory, object);
    if (utils.isScaleVariant(object)) {
      variants.add(path);
    } else if (utils.isImage(object)) {
      bases.add(path);
    }
  }

  let uniqBases = utils.uniqNames(bases);

  let imageVariants = new Map<string, Array<string>>();

  for (let base of uniqBases) {
    // example base: foo.png or sd/foo.png
    // example variants: foo@2x.png, sd/foo@2x.png etc
    let variantsForBase = Array.from(variants).filter((variant) => {
      return utils.isBaseVariant(base, variant);
    });
    imageVariants.set(base, variantsForBase);
  }

  let result: CodegenResult = new Map();

  for (let [base, variants] of imageVariants) {
    let code = utils.codegen(base, variants);
    let parsed = parse(base);
    let name = parsed.name;
    let path = join(parse(base).dir, name + ".ts");
    await fs.writeFile(path, code);
    result.set(base, code);
  }

  return result;
}
