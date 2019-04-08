export default async () => {
  const vecWasmBinaries = fetch('https://raw.githubusercontent.com/LXSMNSYC/vec-wasm/master/src/vec-wasm.wasm');

  let instance;
  if (instantiateStreaming in WebAssembly) {
    const { m, i } = await WebAssembly.instantiateStreaming(vecWasmBinaries);

    instance = i;
  } else if (compileStreaming in WebAssembly) {
    const m = await WebAssembly.compileStreaming(vecWasmBinaries);
    
    instance = await WebAssembly.instantiate(m);
  } else if (compile in WebAssembly && instantiate in WebAssembly) {
    const buffer = await vecWasmBinaries.arrayBuffer();
    const m = await WebAssembly.compile(buffer);

    instance = await WebAssembly.instantiate(m);
  }

  const { exports } = instance;

  const { v_save } = exports;


  const MAX_DIMENSIONS = 128;
  const { min, max } = Math;
  const clamp = (a, b, c) => max(a, min(b, c));

  const save = (f64arr) => {
    const size = clamp(0, f64arr.length, MAX_DIMENSIONS);
    for (let i = 0; i < size; i++) {
      v_save(i, f64arr[i]);
    }
  }

  const load = (size) => {
    const f64arr = new Float64Array(size);
  }

  const vec = {

  }

  return vec;
}