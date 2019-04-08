#!/bin/bash
# My first script

emcc src/vec.c -s WASM=1 -o vec-wasm.js