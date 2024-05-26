import { friendlyErrorPlugin } from "@clerc/plugin-friendly-error"
import { helpPlugin } from "@clerc/plugin-help"
import { notFoundPlugin } from "@clerc/plugin-not-found"
import { strictFlagsPlugin } from "@clerc/plugin-strict-flags"
import { versionPlugin } from "@clerc/plugin-version"
import { Clerc } from "clerc"
import { generate, write } from "./lib"

Clerc.create()
	.scriptName("srcset-codegen")
	.description("Generates srcset")
	.version("0.0.1")
	.use(helpPlugin())
	.use(versionPlugin())
	.use(notFoundPlugin())
	.use(strictFlagsPlugin())
	.use(friendlyErrorPlugin())
	.command("generate", "Generate ts files for all images", {
		parameters: ["<directory>"],
	})
	.on("generate", async (context) => {
		let directory = context.parameters.directory
		const result = await generate({ directory })
		await write(result)
	})
	.parse()
