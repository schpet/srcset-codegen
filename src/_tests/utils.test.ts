import { describe, test } from "node:test"
import assert from "node:assert"
import * as utils from "../util"
import exp from "node:constants"

describe("isScaleVariant", () => {
	test("foo.png is not a scale variant", () => {
		assert.strictEqual(utils.isScaleVariant("foo.png"), false)
	})

	test("foo@2x.png is a scale variant", () => {
		assert.strictEqual(utils.isScaleVariant("foo@2x.png"), true)
	})
})

describe("uniqNames", () => {
	test("given paths like ['foo.jpg', 'foo.png', 'foo.svg'], return ['foo.png']", () => {
		let input = new Set(["foo.jpg", "foo.png", "foo.svg"])
		assert.deepStrictEqual(utils.uniqNames(input), new Set(["foo.png"]))
	})
})

describe("isBaseVariant", () => {
	test("foo@2x.png is a base variant of foo.png", () => {
		assert.strictEqual(utils.isBaseVariant("foo.png", "foo@2x.png"), true)
	})

	test("foo@2x.png is not a base variant of bar.png", () => {
		assert.strictEqual(utils.isBaseVariant("bar.png", "foo@2x.png"), false)
	})
})

describe("codegen", () => {
	test("generates code", () => {
		let result = utils.codegen("src/_tests/fixtures/smile.png", [
			"src/_tests/fixtures/smile@2x.png",
		])
		let expected = `import src from "./smile.png";
import src2x from "./smile@2x.png";

let width = 107;
let height = 107;
let srcSet = \`\${src2x} 2x\`;
export default { src, width, height, srcSet };
`

		assert.strictEqual(result, expected)
	})
	test("generates more variants", () => {
		let result = utils.codegen("src/_tests/fixtures/smile.png", [
			"src/_tests/fixtures/smile@2x.png",
			"src/_tests/fixtures/smile@3x.png",
		])
		let expected = `import src from "./smile.png";
import src2x from "./smile@2x.png";
import src3x from "./smile@3x.png";

let width = 107;
let height = 107;
let srcSet = \`\${src2x} 2x, \${src3x} 3x\`;
export default { src, width, height, srcSet };
`

		assert.strictEqual(result, expected)
	})
})
