import { expect, test } from "vitest"
import * as lib from "../lib"

test("generate", async () => {
	let result = await lib.generateCode({ directory: "src/_tests/fixtures" })
	let keys = Array.from(result.keys())
	expect(keys).toEqual([
		"src/_tests/fixtures/single.png",
		"src/_tests/fixtures/smile.png",
		"src/_tests/fixtures/vector.svg",
		"src/_tests/fixtures/sd/smile.png",
	])
})
