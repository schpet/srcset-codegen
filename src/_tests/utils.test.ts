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
