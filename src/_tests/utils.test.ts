import { describe, test } from "node:test";
import assert from "node:assert";
import * as utils from "../utils";

describe("isScaleVariant", () => {
  test("foo.png is not a scale variant", () => {
    assert.strictEqual(utils.isScaleVariant("foo.png"), false);
  });

  test("foo@2x.png is a scale variant", () => {
    assert.strictEqual(utils.isScaleVariant("foo@2x.png"), true);
  });
});


describe("uniqNames", () => {
  test("given paths like ['foo.jpg', 'foo.png', 'foo.svg'], return ['foo.png']", () => {
    let input = new Set(["foo.jpg", "foo.png", "foo.svg"]);
    assert.deepStrictEqual(utils.uniqNames(input), new Set(["foo.png"]));
  })
  test("nested paths", () => {
    let input = new Set(["foo.png", "foo.svg", "bar/foo.png"]);
    assert.deepStrictEqual(utils.uniqNames(input), new Set(["foo.png", "bar/foo.png"]));
  })
})
