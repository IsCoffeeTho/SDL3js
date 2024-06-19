/* ========================================================================== */
/*                                                                            */
/*                                                             /   /   \      */
/*   Made By Aaron "IsCoffeeTho" Menadue                     /    |      \    */
/*                                                          |     |       |   */
/*   window.c                                               |      \      |   */
/*                                                          |       |     |   */
/*   Last Edited: 07:14AM 20/06/2024                         \      |    /    */
/*                                                             \   /   /      */
/*                                                                            */
/* ========================================================================== */

#include "../SDL3js.h"

napi_value sdl3_CreateWindow(napi_env env, napi_callback_info info)
{
	size_t argc = 4;
	napi_value args[4]; // string, int, int, uint64_t
	char title[256];
	size_t title_len = 0;
	int width, height;
	unsigned int flags;

	napi_get_cb_info(env, info, &argc, args, NULL, NULL);
	if (argc != 4) {
		napi_throw_error(env, "Error", "Invalid amount of arguments. expects (string, number, number, number)");
		return undefined;
	}
	
	napi_status status;
	status = napi_get_value_string_utf8(env, args[0], title, 256, &title_len);
	if (status != napi_ok) return node_handle_error(env, status);
	status = napi_get_value_int32(env, args[1], &width);
	if (status != napi_ok) return node_handle_error(env, status);
	status = napi_get_value_int32(env, args[2], &height);
	if (status != napi_ok) return node_handle_error(env, status);
	status = napi_get_value_uint32(env, args[3], &flags);
	if (status != napi_ok) return node_handle_error(env, status);

	SDL_Window *window = SDL_CreateWindow(title, width, height, flags);

	if (!window) {
		napi_throw_error(env, "SDLError", SDL_GetError());
		return undefined;
	}
	napi_value output;
	napi_create_external(env, window, NULL, NULL, &output);
	return output;
}

void create_window(napi_env env, napi_value *result)
{
	napi_value section;
	napi_create_object(env, &section);

	napi_value var;
	napi_create_function(env, NULL, 0, sdl3_CreateWindow, NULL, &var);
	napi_set_named_property(env, section, "create", var);

	*result = section;
}