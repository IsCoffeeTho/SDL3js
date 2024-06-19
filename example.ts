import SDL3 from ".";

SDL3.initVideo();

const app = new SDL3.window({
	title: "Example window",
	resizable: true
});

SDL3.quit();