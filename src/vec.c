#include <stdlib.h>
#include <math.h>
#include <emscripten/emscripten.h>

#define MAX_DIMENSIONS 128
#define CLAMP(a, b, c) fmax(a, fmin(b, c))

double data[MAX_DIMENSIONS];

EMSCRIPTEN_KEEPALIVE
double v_len2(double* vec, int dim) {
  int d = CLAMP(0, dim, MAX_DIMENSIONS);
  double result = 0;
  for (int i = 0; i < d; i++) {
    result += vec[i] * vec[i];
  }
  return result;
}

EMSCRIPTEN_KEEPALIVE
double v_len(double* vec, int dim) {
  return sqrt(v_len2(vec, dim));
}

EMSCRIPTEN_KEEPALIVE
void v_abs(double* vec, int dim) {
  int d = CLAMP(0, dim, MAX_DIMENSIONS);
  for (int i = 0; i < dim; i++) {
    data[i] = fabs(vec[i]);
  }
}

EMSCRIPTEN_KEEPALIVE
void v_clean() {
  for (int i = 0; i < MAX_DIMENSIONS; i++) {
    data[i] = 0.0;
  }
}

EMSCRIPTEN_KEEPALIVE
void v_save(int index, double value) {
  if (0 <= index && index < MAX_DIMENSIONS) {
    data[index] = value;
  }
}

EMSCRIPTEN_KEEPALIVE
double* v_load() {
  return &data[0];
}