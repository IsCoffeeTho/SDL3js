const bind = require("../build/Release/SDL3.node");

export type windowOptions = {
	title?: string,
	width?: number,
	height?: number,
	fullscreen?: boolean,
	borderless?: boolean,
	resizable?: boolean,
	maximized?: boolean,
	minimized?: boolean,
	hidden?: boolean
};

const windowDefaults: windowOptions = {
	title: "SDL3 JS",
	width: 640,
	height: 480,
	fullscreen: false,
	borderless: false,
	resizable: false,
	maximized: false,
	minimized: false,
	hidden: false
};

export default class window {
	constructor(opt?: windowOptions) {
		Object.setPrototypeOf(opt, windowDefaults);
	}
}