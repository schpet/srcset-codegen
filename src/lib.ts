type GenerateOptions = {
	directory: string
}

export const generate = (options: GenerateOptions) => {
	console.log("Generating srcset in dirx: ", options.directory)
}
