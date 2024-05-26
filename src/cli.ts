import {
	Clerc,
	friendlyErrorPlugin,
	helpPlugin,
	notFoundPlugin,
	strictFlagsPlugin,
	versionPlugin,
} from "clerc"
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
