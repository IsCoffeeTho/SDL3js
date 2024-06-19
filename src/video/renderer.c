/* ========================================================================== */
/*                                                                            */
/*                                                             /   /   \      */
/*   Made By Aaron "IsCoffeeTho" Menadue                     /    |      \    */
/*                                                          |     |       |   */
/*   renderer.c                                             |      \      |   */
/*                                                          |       |     |   */
/*   Last Edited: 07:10AM 20/06/2024                         \      |    /    */
/*                                                             \   /   /      */
/*                                                                            */
/* ========================================================================== */

#include "../SDL3js.h"

napi_value sdl3_CreateRenderer(napi_env env, napi_callback_info info)
{	
	size_t argc = 1;
	napi_value args[1]; // window

	napi_get_cb_info(env, info, &argc, args, NULL, NULL);
	if (argc != 1) {
		napi_throw_error(env, "Error", "Invalid amount of arguments. expects (SDL_Window)");
		return undefined;
	}

	SDL_Window *window;
	
	napi_status status;
	status = napi_get_value_external(env, args[0], (void **)&window);
	if (status != napi_ok) return node_handle_error(env, status);

	SDL_Renderer *renderer = SDL_CreateRenderer(window, NULL);

	if (!window) {
		napi_throw_error(env, "SDLError", SDL_GetError());
		return undefined;
	}
	napi_value output;
	napi_create_external(env, renderer, NULL, NULL, &output);
	return output;
}

napi_value sdl3_SetRendererDrawColor(napi_env env, napi_callback_info info)
{	
	size_t argc = 5;
	napi_value args[5]; // renderer, uint8, uint8, uint8, uint8

	napi_get_cb_info(env, info, &argc, args, NULL, NULL);
	if (argc != 5) {
		napi_throw_error(env, "Error", "Invalid amount of arguments. expects (SDL_Renderer, number, number, number, number)");
		return bool_false;
	}

	SDL_Renderer *renderer;
	int red, green, blue, alpha;
	
	napi_status status;
	status = napi_get_value_external(env, args[0], (void **)&renderer);
	if (status != napi_ok) return node_handle_error(env, status);
	status = napi_get_value_int32(env, args[1], &red);
	if (status != napi_ok) return node_handle_error(env, status);
	status = napi_get_value_int32(env, args[2], &green);
	if (status != napi_ok) return node_handle_error(env, status);
	status = napi_get_value_int32(env, args[3], &blue);
	if (status != napi_ok) return node_handle_error(env, status);
	status = napi_get_value_int32(env, args[4], &alpha);
	if (status != napi_ok) return node_handle_error(env, status);

	if (SDL_SetRenderDrawColor(renderer, red & 0xFF, green & 0xFF, blue & 0xFF, alpha & 0xFF)) {
		napi_throw_error(env, "SDLError", SDL_GetError());
		return bool_false;
	}
	
	return bool_true;
}

napi_value sdl3_RenderClear(napi_env env, napi_callback_info info)
{
	size_t argc = 1;
	napi_value args[1]; // window

	napi_get_cb_info(env, info, &argc, args, NULL, NULL);
	if (argc != 1) {
		napi_throw_error(env, "Error", "Invalid amount of arguments. expects (SDL_Renderer)");
		return undefined;
	}

	SDL_Renderer *renderer;
	napi_status status;
	status = napi_get_value_external(env, args[0], (void **)&renderer);
	if (status != napi_ok) return node_handle_error(env, status);

	if (SDL_RenderClear(renderer)) {
		napi_throw_error(env, "SDLError", SDL_GetError());
		return bool_false;
	}
	return bool_true;
}

napi_value sdl3_RenderPresent(napi_env env, napi_callback_info info)
{
	size_t argc = 1;
	napi_value args[1]; // window

	napi_get_cb_info(env, info, &argc, args, NULL, NULL);
	if (argc != 1) {
		napi_throw_error(env, "Error", "Invalid amount of arguments. expects (SDL_Renderer)");
		return undefined;
	}

	SDL_Renderer *renderer;
	napi_status status;
	status = napi_get_value_external(env, args[0], (void **)&renderer);
	if (status != napi_ok) return node_handle_error(env, status);

	if (SDL_RenderPresent(renderer)) {
		napi_throw_error(env, "SDLError", SDL_GetError());
		return bool_false;
	}
	return bool_true;
}

void create_renderer(napi_env env, napi_value *result)
{
	napi_value section;
	napi_create_object(env, &section);

	napi_value var;
	napi_create_function(env, NULL, 0, sdl3_CreateRenderer, NULL, &var);
	napi_set_named_property(env, section, "create", var);

	napi_create_function(env, NULL, 0, sdl3_SetRendererDrawColor, NULL, &var);
	napi_set_named_property(env, section, "setDrawColor", var);

	napi_create_function(env, NULL, 0, sdl3_RenderClear, NULL, &var);
	napi_set_named_property(env, section, "clear", var);

	napi_create_function(env, NULL, 0, sdl3_RenderPresent, NULL, &var);
	napi_set_named_property(env, section, "present", var);

	*result = section;
}