/* ========================================================================== */
/*                                                                            */
/*                                                             /   /   \      */
/*   Made By Aaron "IsCoffeeTho" Menadue                     /    |      \    */
/*                                                          |     |       |   */
/*   index.c                                                |      \      |   */
/*                                                          |       |     |   */
/*   Last Edited: 07:16AM 20/06/2024                         \      |    /    */
/*                                                             \   /   /      */
/*                                                                            */
/* ========================================================================== */

#include "SDL3js.h"

napi_value node_handle_error(napi_env env, napi_status status)
{
	if (status == napi_string_expected) {
		napi_throw_type_error(env, "TypeError", "Expected string");
	} else if (status == napi_number_expected) {
		napi_throw_type_error(env, "TypeError", "Expected number");
	} else {
		napi_throw_error(env, "Error", "Unknown Error");
	}
	return undefined;
}

napi_value sdl3_quit(napi_env env, napi_callback_info info)
{
	SDL_Quit();
	return undefined;
}

napi_value sdl3_initSubSystem(napi_env env, napi_callback_info info)
{
	size_t argc = 1;
	napi_value args[1];
	SDL_InitFlags init_flags;

	napi_get_cb_info(env, info, &argc, args, NULL, NULL);
	if (!argc)
		napi_throw_error(env, "Error", "SDL3.init(initFlags: number) is missing argument initFlags");
	napi_status status = napi_get_value_uint32(env, args[0], &init_flags);
	if (status != napi_ok) return node_handle_error(env, status);
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
	napi_get_undefined(env, &undefined);
	napi_get_null(env, &null);
	napi_get_boolean(env, 1, &bool_true);
	napi_get_boolean(env, 0, &bool_false);

	atexit(SDL_Quit);

	napi_value var;
	napi_create_function(env, NULL, 0, sdl3_initSubSystem, NULL, &var);
	napi_set_named_property(env, exports, "initSubSystem", var);

	napi_create_function(env, NULL, 0, sdl3_quit, NULL, &var);
	napi_set_named_property(env, exports, "quit", var);

	create_window(env, &var);
	napi_set_named_property(env, exports, "window", var);

	create_renderer(env, &var);
	napi_set_named_property(env, exports, "renderer", var);

	create_event(env, &var);
	napi_set_named_property(env, exports, "event", var);

	return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, lib_init);