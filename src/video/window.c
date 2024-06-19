/* ========================================================================== */
/*                                                                            */
/*                                                             /   /   \      */
/*   Made By Aaron "IsCoffeeTho" Menadue                     /    |      \    */
/*                                                          |     |       |   */
/*   window.c                                               |      \      |   */
/*                                                          |       |     |   */
/*   Last Edited: 12:55AM 20/06/2024                         \      |    /    */
/*                                                             \   /   /      */
/*                                                                            */
/* ========================================================================== */

#include "SDL3js.h"

// might need to figure out napi references
napi_value sdl3_CreateWindow(napi_env env, napi_callback_info info)
{
	size_t argc = 0;
	napi_value args[4];
	
	napi_get_cb_info(env, info, &argc, args, NULL, NULL);
	// napi_get_value_string_utf8(env, args[0], &init_flags);
	dbg_printf("SDL_CreateWindow\n");
	// if (!SDL_Init(init_flags)) {
	// 	return bool_true;
	// }
	// napi_throw_error(env, "SDLError", SDL_GetError());
	return bool_false;
}