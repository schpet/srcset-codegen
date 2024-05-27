import {
	Clerc,
	friendlyErrorPlugin,
	helpPlugin,
	notFoundPlugin,
	strictFlagsPlugin,
	versionPlugin,
} from "clerc";
import { generateCmd, generateCode, write } from "./lib";
import watcher from "@parcel/watcher";

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
		flags: {
			watch: {
				type: Boolean,
				alias: "w",
				default: false,
				description: "Automatically regenerate on file changes",
			},
		},
	})
	.on("generate", async (context) => {
		let directory = context.parameters.directory;
		await generateCmd({ directory });

		if (context.flags.watch) {
			console.log(`Watching for changes in ${directory}…`);
			await watcher.subscribe(
				directory,
				async (err) => {
					if (err) {
						console.error("Uh oh", err);
						process.exit(1);
					} else {
						console.log("Generating outputs");
						await generateCmd({ directory });
					}
				},
				{
					ignore: ["**/*.ts"],
				}
			);
		}
	})
	.parse();
