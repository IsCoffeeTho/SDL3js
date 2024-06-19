# SDL3 JS

Use SDL3 in bun with this library

```ts
import SDL3 from "sdl3js";

SDL3.initVideo();

const applet = new SDL3.window({
	title: "Example window",
	width: 1280,
	height : 720,
	resizable: true
});

```