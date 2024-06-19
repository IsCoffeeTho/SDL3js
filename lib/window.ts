import type { ExternalModuleReference } from "typescript";
import renderer from "./renderer";
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

const windowFlags = {
	fullscreen: 0x01,
	borderless: 0x10,
	resizable: 0x020,
	maximized: 0x080,
	minimized: 0x040,
	hidden: 0x000008
}

export default class window {
	#window_ptr: ExternalModuleReference;
	renderer: renderer;
	constructor(opt?: windowOptions) {
		Object.setPrototypeOf(opt, windowDefaults);
		var flags = 0;
		for (var flag in windowFlags) {
			if ((<{ [_: string]: Boolean }>opt)[flag])
				flags |= (<{ [_: string]: number }>windowFlags)[flag];
		}
		this.#window_ptr = bind.window.create(
			opt?.title ?? windowDefaults.title,
			opt?.width ?? windowDefaults.width,
			opt?.height ?? windowDefaults.height,
			flags
		);

		this.renderer = new renderer(this.#window_ptr);
	}
}