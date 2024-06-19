{
	"targets": [
		{
			"target_name": "SDL3",
			"sources": [
				"src/index.c",
				"src/events.c",
				"src/video/window.c",
				"src/video/renderer.c"
			],
			"defines": [
				"DEBUG_SDL"
			],
			"conditions": [
				['OS == "linux"', {
					"include_dirs": [ "-Isrc/", "<!(pkgconf sdl3 --cflags-only-I)" ],
					"libraries": [ "<!(pkgconf sdl3 --libs)" ]
				}]
			]
		}
	]
}