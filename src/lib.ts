type GenerateOptions = {
	directory: string
}

// - for every image in the directory that doesn't end in @2x, etc
export const generate = (options: GenerateOptions) => {
	console.log("Generating srcset in dirx: ", options.directory)
}


function isScaleVariant(filename: string) {
  let basename = filename.split('/').pop()
  return filename.match(/@(\d)x\./)
}
