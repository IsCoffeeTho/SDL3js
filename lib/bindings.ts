import window from "./window";
import renderer from "./renderer";
import {SDLEvents, SDL_Emitter} from "./events";

const bind = require("../build/Release/SDL3.node");

const initFlags: { [_: string]: number } = {
	Timer: 0x00000001,
	Audio: 0x00000010,
	Video: 0x00000020,
	Joystick: 0x00200,
	Haptic: 0x0001000,
	Gamepad: 0x002000,
	Events: 0x0004000,
	Sensor: 0x0008000,
	Camera: 0x0010000
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
	renderer,
	...SDLEvents,
	pollEvent() { bind.events.poll(SDL_Emitter.instance.emit); }
};