import window from "./lib/window";
import renderer from "./lib/renderer";

const bind = require("./build/Release/SDL3.node");

const initFlags: { [_: string]: number } = {
	Timer: 0x00001,
	Audio: 0x00010,
	Video: 0x00020,
	Joystick: 0x00200,
	Haptic: 0x01000,
	Gamepad: 0x02000,
	Events: 0x04000,
	Sensor: 0x08000,
	Camera: 0x10000
};

export default {
	initTimer() { bind.initSubSystem(initFlags.Timer); },
	initAudio() { bind.initSubSystem(initFlags.Audio); },
	initVideo() { bind.initSubSystem(initFlags.Video); },
	initJoystick() { bind.initSubSystem(initFlags.Joystick); },
	initHaptic() { bind.initSubSystem(initFlags.Haptic); },
	initGamepad() { bind.initSubSystem(initFlags.Gamepad); },
	initEvents() { bind.initSubSystem(initFlags.Events); },
	initSensor() { bind.initSubSystem(initFlags.Sensor); },
	initCamera() { bind.initSubSystem(initFlags.Camera); },
	quit: <() => void>bind.quit,
	window,
	renderer
};