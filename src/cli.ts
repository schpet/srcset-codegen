import {
	Clerc,
	friendlyErrorPlugin,
	helpPlugin,
	notFoundPlugin,
	strictFlagsPlugin,
	versionPlugin,
} from "clerc"
import { description, name, version } from "../package.json"
import { generate } from "./commands/generate"

Clerc.create(name, version, description)
	.use(helpPlugin())
	.use(versionPlugin())
	.use(notFoundPlugin())
	.use(strictFlagsPlugin())
	.use(friendlyErrorPlugin())
	.command(generate)
	.parse()
