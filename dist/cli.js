#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import React from "react";
// import { render } from "ink";
const meow_1 = __importDefault(require("meow"));
const acp_1 = __importDefault(require("./cli/acp"));
const help_1 = __importDefault(require("./cli/help"));
const shelljs_1 = __importDefault(require("shelljs"));
// import App from "./ui";
const cli = (0, meow_1.default)(help_1.default, {
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
});
if (!shelljs_1.default.which("git")) {
    shelljs_1.default.echo();
    shelljs_1.default.echo("  抱歉，请先安装git后再使用！");
    shelljs_1.default.echo();
    shelljs_1.default.exit(1);
}
switch (cli.input[0]) {
    case "acp":
        (0, acp_1.default)();
        break;
    default:
        cli.showHelp();
        break;
}
// render(<App name={cli.flags.name} />);
