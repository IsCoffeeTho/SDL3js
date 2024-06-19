{
	"targets": [
		{
			"target_name": "SDL3",
			"sources": [
				"src/index.c"
			],
			"defines": [
				# "DEBUG_SDL"
			],
			"conditions": [
				['OS == "linux"', {
					"include_dirs": [ "-I.", "<!(pkgconf sdl3 --cflags-only-I)" ],
					"libraries": [ "<!(pkgconf sdl3 --libs)" ]
				}]
			]
		}
	]
}