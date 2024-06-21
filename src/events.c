/* ========================================================================== */
/*                                                                            */
/*                                                             /   /   \      */
/*   Made By Aaron "IsCoffeeTho" Menadue                     /    |      \    */
/*                                                          |     |       |   */
/*   events.c                                               |      \      |   */
/*                                                          |       |     |   */
/*   Last Edited: 06:59AM 21/06/2024                         \      |    /    */
/*                                                             \   /   /      */
/*                                                                            */
/* ========================================================================== */

#include "SDL3js.h"

napi_value sdl3_PollEvent(napi_env env, napi_callback_info info)
{
	size_t argc = 1;
	napi_value args[1]; // emit(string, ...args): void 

	napi_get_cb_info(env, info, &argc, args, NULL, NULL);
	if (argc != 1)
		napi_throw_error(env, "Error", "Invalid amount of arguments. expects (Function)");
	napi_valuetype type;
	napi_status status = napi_typeof(env, args[0], &type);
	if (status != napi_ok) return node_handle_error(env, status, "emit");
	if (type != napi_function) return node_handle_error(env, napi_function_expected, "emit");
	
	SDL_Event event;
	if (!SDL_PollEvent(&event))
		return undefined;

	

	return null;
}

void create_event(napi_env env, napi_value *result)
{
	napi_value section;
	napi_create_object(env, &section);

	napi_value var;

	napi_create_function(env, NULL, 0, sdl3_PollEvent, NULL, &var);
	napi_set_named_property(env, section, "poll", var);

	*result = section;
}