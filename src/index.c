/* ========================================================================== */
/*                                                                            */
/*                                                             /   /   \      */
/*   Made By Aaron "IsCoffeeTho" Menadue                     /    |      \    */
/*                                                          |     |       |   */
/*   index.c                                                |      \      |   */
/*                                                          |       |     |   */
/*   Last Edited: 12:43AM 20/06/2024                         \      |    /    */
/*                                                             \   /   /      */
/*                                                                            */
/* ========================================================================== */

#include "SDL3js.h"

napi_value sdl3_quit(napi_env env, napi_callback_info info)
{
	dbg_printf("SDL_Quit\n");
	SDL_Quit();
	return undefined;
}

napi_value sdl3_initSubSystem(napi_env env, napi_callback_info info)
{
	dbg_printf("SDL_INIT\n");
	size_t argc = 0;
	napi_value args[1];
	SDL_InitFlags init_flags;

	napi_get_cb_info(env, info, &argc, args, NULL, NULL);
	if (!argc)
		napi_throw_error(env, "Error", "SDL3.init(initFlags: number) is missing argument initFlags");
	napi_get_value_uint32(env, args[0], &init_flags);
	if (!SDL_Init(init_flags))
		return bool_true;
	napi_throw_error(env, "SDLError", SDL_GetError());
	return bool_false;
}

napi_value undefined;
napi_value null;
napi_value bool_true;
napi_value bool_false;

napi_value lib_init(napi_env env, napi_value exports)
{
	dbg_printf("SDL3 library initalization\n");

	napi_get_undefined(env, &undefined);
	napi_get_null(env, &null);
	napi_get_boolean(env, 1, &bool_true);
	napi_get_boolean(env, 0, &bool_false);

	atexit(SDL_Quit);

	napi_value b_init;
	napi_create_function(env, NULL, 0, sdl3_initSubSystem, NULL, &b_init);
	napi_set_named_property(env, exports, "initSubSystem", b_init);

	napi_value b_quit;
	napi_create_function(env, NULL, 0, sdl3_quit, NULL, &b_quit);
	napi_set_named_property(env, exports, "quit", b_quit);

	dbg_printf("SDL3 library ready\n");
	return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, lib_init);