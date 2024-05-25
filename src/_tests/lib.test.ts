import test from "node:test";
import * as lib from "../lib";
import assert from "node:assert";

test("generate", async () => {
  let result = await lib.generate({ directory: "src/_tests/fixtures" });
  let keys = Array.from(result.keys());
  // assert.strictEqual(keys, ["smile.ts", "vector.ts", "sd/smile.ts"]);
});
