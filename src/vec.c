#include <stdlib.h>
#include <math.h>
#include <emscripten/emscripten.h>

#define MAX_DIMENSIONS 128
#define CLAMP(a, b, c) fmax(a, fmin(b, c))

double data[MAX_DIMENSIONS];

EMSCRIPTEN_KEEPALIVE
void vclean() {
  for (int i = 0; i < MAX_DIMENSIONS; i++) {
    data[i] = 0.0;
  }
}

EMSCRIPTEN_KEEPALIVE
void vsave(int index, double value) {
  if (0 <= index && index < MAX_DIMENSIONS) {
    data[index] = value;
  }
}

EMSCRIPTEN_KEEPALIVE
double* vload() {
  return &data[0];
}

EMSCRIPTEN_KEEPALIVE
double vlen2(int dim) {
  int d = CLAMP(0, dim, MAX_DIMENSIONS);
  double result = 0;
  for (int i = 0; i < d; i++) {
    result += data[i] * data[i];
  }
  return result;
}

EMSCRIPTEN_KEEPALIVE
double vlen(int dim) {
  return sqrt(vlen2(dim));
}

EMSCRIPTEN_KEEPALIVE
void vabs(int dim) {
  int d = CLAMP(0, dim, MAX_DIMENSIONS);
  for (int i = 0; i < dim; i++) {
    data[i] = fabs(data[i]);
  }
}

void vacos(int dim) {
  int d = CLAMP(0, dim, MAX_DIMENSIONS);
  for (int i = 0; i < dim; i++) {
    data[i] = acos(data[i]);
  }
}

void vacosh(int dim) {
  int d = CLAMP(0, dim, MAX_DIMENSIONS);
  for (int i = 0; i < dim; i++) {
    data[i] = acosh(data[i]);
  }
}