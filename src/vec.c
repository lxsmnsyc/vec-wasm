#include <math.h>
#include <emscripten/emscripten.h>

EMSCRIPTEN_KEEPALIVE
double len2(double* vec, int dim) {
  double result = 0;
  for (int i = 0; i < dim; i++) {
    result += vec[i] * vec[i];
  }
  return result;
}

EMSCRIPTEN_KEEPALIVE
double len(double* vec, int dim) {
  return sqrt(len2(vec, dim));
}