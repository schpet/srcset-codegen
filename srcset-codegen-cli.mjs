// @ts-check
import { Clerc } from "clerc";


const cli = Clerc.create()
  .name("Foo CLI") // Optional, defaults to scriptName
  .scriptName("foo-cli")
  .description("A simple cli")
  .version("1.0.0") // You can use Clerc.create(name, description, version) instead
  .command("foo", "A foo command", {
    parameters: [
      "<path>"
    ],
    flags: {
      someString: {
        type: String,
        description: "Some string flag",
        default: "n/a",
      },
    },
  })
  .on("foo", (context) => {
    console.log("It works!");
    console.log(context.parameters.path)
  })
  .parse();
