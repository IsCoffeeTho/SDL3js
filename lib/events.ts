/* ========================================================================== */
/*                                                                            */
/*                                                             /   /   \      */
/*   Made By Aaron "IsCoffeeTho" Menadue                     /    |      \    */
/*                                                          |     |       |   */
/*   events.ts                                              |      \      |   */
/*                                                          |       |     |   */
/*   Last Edited: 01:19PM 21/06/2024                         \      |    /    */
/*                                                             \   /   /      */
/*                                                                            */
/* ========================================================================== */

import { EventEmitter } from "node:events";

type SDL_CommonEvent = {
	/** in nanoseconds */
	timestamp: bigint
};

type SDL_DisplayEvent = SDL_CommonEvent & {
	displayID: number,
	/** event dependant data*/
	data1: number
};

type SDL_WindowEvent = SDL_CommonEvent & {
	windowID: number,
	/** event dependant data */
	data1: number,
	/** event dependant data */
	data2: number
};

type SDL_KeyboardDeviceEvent = SDL_CommonEvent & {
	keyboardID: number
};

type SDL_KeyboardEvent = SDL_KeyboardDeviceEvent & {
	windowID: number,
	state: number,
	repeat: number,
	scancode: number,
	keycode: number,
	lShift: boolean,
	rShift: boolean,
	shift: boolean,
	lCtrl: boolean,
	rCtrl: boolean,
	ctrl: boolean,
	lAlt: boolean,
	rAlt: boolean,
	alt: boolean,
	lGui: boolean,
	rGui: boolean,
	gui: boolean,
	numLock: boolean,
	capsLock: boolean,
	AltGr: boolean,
	scrollLock: boolean
};

type SDL_TextEditingEvent = SDL_CommonEvent & {
	windowID: number,
	text: string,
	start: number,
	length: number,
};

type SDL_TextInputEvent = SDL_CommonEvent & {
	windowID: number,
	text: string,
};

type SDL_MouseDeviceEvent = SDL_CommonEvent & {
	mouseID: number,
};

type SDL_MouseMotionEvent = SDL_MouseDeviceEvent & {
	windowID: number,
	state: {
		leftButton: boolean,
		middleButton: boolean,
		rightButton: boolean,
		thumb1: boolean,
		thumb2: boolean,
	},
	x: number,
	y: number,
	xrel: number,
	yrel: number
};

type SDL_MouseButtonEvent = SDL_MouseDeviceEvent & {
	windowID: number,
	button: number,
	pressed: boolean,
	doubleClick: boolean,
	x: number,
	y: number,
};

type SDL_MouseWheelEvent = SDL_MouseDeviceEvent & {
	windowID: number,
	x: number,
	y: number,
	mouseX: number,
	mouseY: number,
};

type SDL_JoyDeviceEvent = SDL_CommonEvent & {
	joystickID: number
}

type SDL_JoyAxisEvent = SDL_JoyDeviceEvent & {
	axis: number,
	value: number
};

type SDL_JoyBallEvent = SDL_JoyDeviceEvent & {
	ball: number,
	xrel: number,
	yrel: number
}

type SDL_JoyHatEvent = SDL_JoyDeviceEvent & {
	hat: number,
	up: boolean,
	down: boolean,
	left: boolean,
	right: boolean
};

type SDL_JoyButtonEvent = SDL_JoyDeviceEvent & {
	button: number,
	pressed: boolean
}


type SDL_JoyBatteryEvent = SDL_JoyDeviceEvent & {
	state: number,
	percent: number
}

type SDL_GamepadDeviceEvent = SDL_CommonEvent & {
	gamepadID: number
};

type SDL_GamepadAxisEvent = SDL_GamepadDeviceEvent & {
	axis: number,
	value: number
}

type SDL_GamepadButtonEvent = SDL_GamepadDeviceEvent & {
	button: number,
	pressed: boolean
}

type SDL_GamepadTouchpadEvent = SDL_GamepadDeviceEvent & {
	touchpad: number,
	finger: number,
	x: number,
	y: number,
	pressure: number,
}

type SDL_GamepadSensorEvent = SDL_GamepadDeviceEvent & {
	sensor: number,
	data: number[],
	sensor_timestamp: bigint
}

type SDL_TouchFingerEvent = SDL_CommonEvent & {
	touchID: number,
	fingerID: number,
	x: number,
	y: number,
	dx: number,
	dy: number,
	windowID?: number
};

type SDL_ClipboardEvent = SDL_CommonEvent;

type SDL_DropEvent = SDL_CommonEvent & {
	windowID: number,
	x: number,
	y: number,
	source?: string,
	data?: string
};

type SDL_SensorEvent = SDL_CommonEvent & {
	sensorID: number,
	data: number[],
	sensor_timestamp: bigint,
}

type SDL_AudioDeviceEvent = SDL_CommonEvent & {
	audioDeviceID: number,
	isCapture: boolean
};

type SDL_PenEvent = SDL_CommonEvent & {
	widowID: number,
	penID: number,
	x: number,
	y: number,
	pressure: number,
	xTilt: number,
	yTilt: number,
	distance: number,
	rotation: number,
	slider: number
};

type SDL_PenMotionEvent = SDL_PenEvent;

type SDL_PenTipEvent = SDL_PenEvent & {
	tip: number,
	pressed: boolean
};

type SDL_PenButtonEvent = SDL_PenEvent & {
	button: number,
	pressed: boolean
};


type SDL_CameraDeviceEvent = SDL_CommonEvent & {
	cameraID: number
};

type SDL_QuitEvent = SDL_CommonEvent;

type SDL_Events = {
	/** User-requested quit */
	"quit": [SDL_CommonEvent],

	/** (MOBILE) The Application is being terminated by the OS */
	"terminating": [SDL_CommonEvent],
	/** (MOBILE) The Application is about to enter background */
	"willEnterBackground": [SDL_CommonEvent],
	/** (MOBILE) The Application did enter background and my not get CPU for some time */
	"didEnterBackground": [SDL_CommonEvent],
	/** (MOBILE) The Application is about to enter foreground */
	"willEnterForeground": [SDL_CommonEvent],
	/** (MOBILE) The Application is now interactive */
	"didEnterForeground": [SDL_CommonEvent],

	/** The user's locale preferences have changed */
	"localeChanged": [SDL_CommonEvent],
	/** The system theme changed */
	"systemThemeChanged": [SDL_CommonEvent],

	/** Display events */
	/** Display orientation has changed to data1 */
	"displayOrientation": [SDL_DisplayEvent],
	/** Display has been added to the system */
	"displayAdded": [SDL_DisplayEvent],
	/** Display has been removed from the system */
	"displayRemoved": [SDL_DisplayEvent],
	/** Display has changed position */
	"displayMove": [SDL_DisplayEvent],
	/** Display has changed content scale */
	"displayContentScaleChanged": [SDL_DisplayEvent],
	/** Display HDR properties have changed */
	"displayHDRScaleChanged": [SDL_DisplayEvent],

	/** Window events */
	"windowShown": [SDL_WindowEvent],
	"windowHidden": [SDL_WindowEvent],
	"windowExposed": [SDL_WindowEvent],
	"windowMove": [SDL_WindowEvent],
	"windowResized": [SDL_WindowEvent],
	"windowPixelSizeChanged": [SDL_WindowEvent],
	"windowMinimized": [SDL_WindowEvent],
	"windowMaximized": [SDL_WindowEvent],
	"windowRestored": [SDL_WindowEvent],
	"windowMouseEnter": [SDL_WindowEvent],
	"windowMouseLeave": [SDL_WindowEvent],
	"windowFocused": [SDL_WindowEvent],
	"windowBlured": [SDL_WindowEvent],
	"windowExit": [SDL_WindowEvent],
	"windowICCProfChanged": [SDL_WindowEvent],
	"windowDisplayChanged": [SDL_WindowEvent],
	"windowDisplayScaleChanged": [SDL_WindowEvent],
	"windowFullscreen": [SDL_WindowEvent],
	"windowExitFullscreen": [SDL_WindowEvent],
	"windowDestroyed": [SDL_WindowEvent],
	"windowPenEnter": [SDL_WindowEvent],
	"windowPenLeave": [SDL_WindowEvent],

	/** Keyboard events */
	"keyPress": [SDL_KeyboardEvent],
	"keyRelease": [SDL_KeyboardEvent],
	"textEditing": [SDL_TextEditingEvent],
	"textInput": [SDL_TextInputEvent],
	"keyboardAdded": [SDL_KeyboardDeviceEvent],
	"keyboardRemoved": [SDL_KeyboardDeviceEvent],

	/** Mouse events */
	"mouseMove": [SDL_MouseMotionEvent],
	"mousePress": [SDL_MouseButtonEvent],
	"mouseRelease": [SDL_MouseButtonEvent],
	"mouseWheel": [SDL_MouseWheelEvent],
	"mouseAdded": [SDL_MouseDeviceEvent],
	"mouseRemoved": [SDL_MouseDeviceEvent],

	/** Joystick events */
	"joystickAxis": [SDL_JoyAxisEvent],
	"joystickBall": [SDL_JoyBallEvent],
	"joystickHat": [SDL_JoyHatEvent],
	"joystickPress": [SDL_JoyButtonEvent],
	"joystickRelease": [SDL_JoyButtonEvent],
	"joystickAdded": [SDL_JoyDeviceEvent],
	"joystickRemove": [SDL_JoyDeviceEvent],
	"joystickBattery": [SDL_JoyDeviceEvent],

	/** Gamepad events */
	"gamepadAxis": [SDL_GamepadAxisEvent],
	"gamepadPress": [SDL_GamepadButtonEvent],
	"gamepadReleased": [SDL_GamepadButtonEvent],
	"gamepadAdded": [SDL_GamepadButtonEvent],
	"gamepadRemoved": [SDL_GamepadButtonEvent],
	"gamepadRemapped": [SDL_GamepadButtonEvent],
	"gamepadTouchpadDown": [SDL_GamepadTouchpadEvent],
	"gamepadTouchpadMove": [SDL_GamepadTouchpadEvent],
	"gamepadTouchpadUp": [SDL_GamepadTouchpadEvent],
	"gamepadSensor": [SDL_GamepadSensorEvent],
	"gamepadSteam": [SDL_GamepadDeviceEvent],

	/** Touch events */
	"touchPress": [SDL_TouchFingerEvent],
	"touchMove": [SDL_TouchFingerEvent],
	"touchRelease": [SDL_TouchFingerEvent],

	/** Clipboard events */
	"clipboardUpdated": [SDL_ClipboardEvent],

	/** Drag and drop events */
	"dropFile": [SDL_DropEvent],
	"dropText": [SDL_DropEvent],
	"dropBegin": [SDL_DropEvent],
	"dropComplete": [SDL_DropEvent],
	"dropPosition": [SDL_DropEvent],

	/** Audio hotplug events */
	"audioDeviceAdded": [SDL_AudioDeviceEvent],
	"audioDeviceRemoved": [SDL_AudioDeviceEvent],
	"audioDeviceFormatChanged": [SDL_AudioDeviceEvent],

	/** Sensor events */
	"sensor": [SDL_SensorEvent],

	/** Pressure-sensitive pen events */
	"penDown": [SDL_PenTipEvent],
	"penUp": [SDL_PenTipEvent],
	"penMove": [SDL_PenTipEvent],
	"penButtonDown": [SDL_PenButtonEvent],
	"penButtonUp": [SDL_PenButtonEvent],

	/** Camera hotplug events */
	"cameraAdded": [SDL_CameraDeviceEvent],
	"cameraRemoved": [SDL_CameraDeviceEvent],
	"cameraAccepted": [SDL_CameraDeviceEvent],
	"cameraDenied": [SDL_CameraDeviceEvent],

	/** Render Events */ /** Might be useful to keep */
	/** The render targets have been reset and their contents need to be updated */
	"SDL_EVENT_RENDER_TARGETS_RESET": [SDL_CommonEvent],
	/** The device has been reset and all textures need to be recreated */
	"SDL_EVENT_RENDER_DEVICE_RESET": [SDL_CommonEvent]
};

export class SDL_Emitter extends EventEmitter<SDL_Events> {
	constructor() { super(); }
	static instance = new SDL_Emitter();
}

export const SDLEvents = {
	on: SDL_Emitter.instance.on,
	once: SDL_Emitter.instance.once,
	addListener: SDL_Emitter.instance.addListener,
	off: SDL_Emitter.instance.off,
	listenerCount: SDL_Emitter.instance.listenerCount,
	listeners: SDL_Emitter.instance.listeners,
	getMaxListeners: SDL_Emitter.instance.getMaxListeners,
	setMaxListeners: SDL_Emitter.instance.setMaxListeners,
	removeListener: SDL_Emitter.instance.removeListener,
	removeAllListeners: SDL_Emitter.instance.removeAllListeners,
	prependListener: SDL_Emitter.instance.prependListener,
	prependOnceListender: SDL_Emitter.instance.prependOnceListener
};