#!/usr/bin/env node
// import React from "react";
// import { render } from "ink";
import meow from "meow"
import acp from "./cli/acp"
import help from "./cli/help"
import shell from "shelljs"
// import App from "./ui";

const cli = meow(help, {
	flags: {
		help: {
			type: "boolean",
			default: false,
			alias: "h",
		},
		version: {
			type: "boolean",
			default: false,
			alias: "v",
		},
		// unicorn: {
		// 	type: 'string',
		// 	alias: 'u',
		// 	// default: 'rainbow',
		// 	isMultiple: true,
		// 	isRequired: (flags, input) => {
		// 		console.log('input', input);

		// 		if (flags["otherFlag"]) {
		// 			return true;
		// 		}

		// 		return false;
		// 	}
		// }
	},
})
console.log("1", cli.flags, cli.input)

if (!shell.which("git")) {
	shell.echo()
	shell.echo("  抱歉，请先安装git后再使用！")
	shell.echo()
	shell.exit(1)
}

switch (cli.input[0]) {
	case "acp":
		acp()
		break
	default:
		cli.showHelp()
		break
}

// render(<App name={cli.flags.name} />);
