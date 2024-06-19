import SDL3 from ".";

SDL3.initVideo();

const app = new SDL3.window({
	title: "Example window",
	width: 500,
	height: 500
});

while (true) {
	app.renderer.setColor(0x111111FF);
	app.renderer.clear();

	app.renderer.present();
}