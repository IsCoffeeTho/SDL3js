/* ========================================================================== */
/*                                                                            */
/*                                                             /   /   \      */
/*   Made By Aaron "IsCoffeeTho" Menadue                     /    |      \    */
/*                                                          |     |       |   */
/*   SDL3js.h                                               |      \      |   */
/*                                                          |       |     |   */
/*   Last Edited: 05:44PM 20/06/2024                         \      |    /    */
/*                                                             \   /   /      */
/*                                                                            */
/* ========================================================================== */

#ifndef __SDL3JS_H
#define __SDL3JS_H

#include <node_api.h>
#include <stdio.h>
#include <stdlib.h>
#include <SDL3/SDL.h>
#include <SDL3/SDL_main.h>
#include "video/video.h"

#ifdef DEBUG_SDL
#define dbg_printf(...) printf(__VA_ARGS__)
#else
#define dbg_printf(...)
#endif

napi_value node_handle_error(napi_env env, napi_status status, const char* arg);

void create_event(napi_env env, napi_value *result);

extern napi_value undefined;
extern napi_value null;
extern napi_value bool_true;
extern napi_value bool_false;

#endif