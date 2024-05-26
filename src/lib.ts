import { promises as fs } from "node:fs"
import * as utils from "./utils"
import { join, parse } from "node:path"

type GenerateOptions = {
	directory: string
}

type CodegenResult = Map<string, string>

export async function generate(
	options: GenerateOptions,
): Promise<CodegenResult> {
	console.log("Generating srcset in dirx: ", options.directory)

	let bases = new Set<string>()
	let variants = new Set<string>()
	let directories = new Set<string>()

	for (let object of await fs.readdir(options.directory)) {
		let path = join(options.directory, object)
		if (utils.isScaleVariant(object)) {
			variants.add(path)
		} else if (utils.isImage(object)) {
			bases.add(path)
		} else if ((await fs.stat(path)).isDirectory()) {
			directories.add(path)
		}
	}

	let uniqBases = utils.uniqNames(bases)

	let imageVariants = new Map<string, Array<string>>()

	for (let base of uniqBases) {
		// example base: foo.png or sd/foo.png
		// example variants: foo@2x.png, sd/foo@2x.png etc
		let variantsForBase = Array.from(variants).filter((variant) => {
			return utils.isBaseVariant(base, variant)
		})
		imageVariants.set(base, variantsForBase)
	}

	let result: CodegenResult = new Map()

	for (let [base, variants] of imageVariants) {
		let code = utils.codegen(base, variants)
		result.set(base, code)
	}

	for (let directory of directories) {
		let subResult = await generate({ directory })
		for (let [key, value] of subResult) {
			result.set(key, value)
		}
	}

	return result
}

export const write = async (result: CodegenResult) => {
	for (let [path, typescript] of result) {
    let name = parse(path).name
    let directory = parse(path).dir
    let dest = join(directory, `${name}.ts`)
		await fs.writeFile(dest, typescript)
	}
}
