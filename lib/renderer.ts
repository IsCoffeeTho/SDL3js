import type { ExternalModuleReference } from "typescript";
const bind = require("../build/Release/SDL3.node");

export default class renderer {
	#renderer_ptr: ExternalModuleReference
	constructor(window_ptr: ExternalModuleReference) {
		this.#renderer_ptr = bind.renderer.create(
			window_ptr
		);
	}

	setColor(rgba: number) {
		var alpha = rgba;
		var blue = alpha >> 8;
		var green = blue >> 8;
		var red = green >> 8;
		try {
			bind.renderer.setDrawColor(
				this.#renderer_ptr,
				red, green, blue, alpha
			);
		} catch (err) {
			console.log(err);
		}
	}
	setColour(rgba: number) { this.setColor(rgba) }

	clear() { bind.renderer.clear(this.#renderer_ptr); }
	present() { bind.renderer.present(this.#renderer_ptr); }
}