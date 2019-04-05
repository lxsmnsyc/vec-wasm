#!/bin/bash
# My first script

emcc src/vec.c -s WASM=1 -s "EXPORTED_FUNCTIONS=['_len2', '_len']" -o src/vec-wasm.html