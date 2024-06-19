/* ========================================================================== */
/*                                                                            */
/*                                                             /   /   \      */
/*   Made By Aaron "IsCoffeeTho" Menadue                     /    |      \    */
/*                                                          |     |       |   */
/*   events.c                                               |      \      |   */
/*                                                          |       |     |   */
/*   Last Edited: 07:41AM 20/06/2024                         \      |    /    */
/*                                                             \   /   /      */
/*                                                                            */
/* ========================================================================== */

#include "SDL3js.h"

napi_value sdl3_PollEvent(napi_env env, napi_callback_info info)
{
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