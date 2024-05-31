import { generateCmd } from "@/lib"
import watcher from "@parcel/watcher"
import { defineCommand } from "clerc"

export const generate = defineCommand(
	{
		name: "generate",
		description: "Generate ts files for all images",
		parameters: ["<directory>"],
		flags: {
			watch: {
				type: Boolean,
				alias: "w",
				default: false,
				description: "Automatically regenerate on file changes",
			},
		},
	},
	async (context) => {
		let directory = context.parameters.directory
		await generateCmd({ directory })

		if (context.flags.watch) {
			console.log(`Watching for changes in ${directory}…`)
			await watcher.subscribe(
				directory,
				async (err) => {
					if (err) {
						console.error("Uh oh", err)
						process.exit(1)
					} else {
						console.log("Generating outputs")
						await generateCmd({ directory })
					}
				},
				{
					ignore: ["**/*.ts"],
				},
			)
		}
	},
)
