/* ========================================================================== */
/*                                                                            */
/*                                                             /   /   \      */
/*   Made By Aaron "IsCoffeeTho" Menadue                     /    |      \    */
/*                                                          |     |       |   */
/*   errors.c                                               |      \      |   */
/*                                                          |       |     |   */
/*   Last Edited: 06:01PM 20/06/2024                         \      |    /    */
/*                                                             \   /   /      */
/*                                                                            */
/* ========================================================================== */

#include "SDL3js.h"

#define string_v(str) str, sizeof(str)-1 

napi_value node_handle_error(napi_env env, napi_status status, const char* arg)
{
	if (status >= napi_object_expected && status <= napi_array_expected) {
		napi_throw_type_error(env, "TypeError", "Expected number");
	} else {
		napi_value err_code;
		napi_create_string_utf8(env, string_v("Error"), &err_code);
		napi_value err_msg;
		napi_create_string_utf8(env, string_v("Unknown Error"), &err_msg);
		napi_value err;
		napi_create_error(env, err_code, err_msg, &err);
		napi_throw(env, err);
	}
	return undefined;
}