import { Clerc } from "clerc";
import { helpPlugin } from "@clerc/plugin-help";
import { versionPlugin } from "@clerc/plugin-version";
import { notFoundPlugin } from "@clerc/plugin-not-found";
import { strictFlagsPlugin } from "@clerc/plugin-strict-flags";
import { generate, write } from "./lib";

Clerc.create()
  .scriptName("srcset-codegen")
  .description("Generates srcset")
  .version("0.0.1")
  .use(helpPlugin())
  .use(versionPlugin())
  .use(notFoundPlugin())
  .use(strictFlagsPlugin())
  .command("generate", "Generate ts files for all images", {
    parameters: ["<directory>"],
  })
  .on("generate", async (context) => {
    let directory = context.parameters.directory;
    const result = await generate({ directory });
    await write(result);
  })
  .parse();
