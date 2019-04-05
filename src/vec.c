#include <math.h>

double len2(double* vec, int dim) {
  double result = 0;
  for (int i = 0; i < dim; i++) {
    result += vec[i] * vec[i];
  }
  return result;
}

double len(double* vec, int dim) {
  return len2(vec, dim);
}