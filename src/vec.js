export default async () => {
  const vecWasmBinaries = fetch('https://raw.githubusercontent.com/LXSMNSYC/vec-wasm/master/src/vec-wasm.wasm');

  let inst;
  if ('instantiateStreaming' in WebAssembly) {
    const { module, instance } = await WebAssembly.instantiateStreaming(vecWasmBinaries);

    inst = instance;
  } else if ('compileStreaming' in WebAssembly) {
    const m = await WebAssembly.compileStreaming(vecWasmBinaries);

    inst = await WebAssembly.instantiate(m);
  } else if ('compile' in WebAssembly && 'instantiate' in WebAssembly) {
    const bin = await vecWasmBinaries;
    const buffer = await bin.arrayBuffer();
    const m = await WebAssembly.compile(buffer);

    inst = await WebAssembly.instantiate(m);
  } else {
    throw new Error('Failed to compile WebAssembly module: missing WebAssembly.');
  }

  const {
    vsave, vload, vclean,
    vabs, vacos, vacosh,
    vlen, vlen2,
  } = inst.exports;

  const MAX_DIMENSIONS = 128;
  const { min, max } = Math;
  const clamp = (a, b, c) => max(a, min(b, c));

  const loadData = vload();

  const linearMemory = new Uint32Array(inst.exports.memory.buffer, loadData, MAX_DIMENSIONS);

  const save = (f64arr) => {
    vclean();
    const size = clamp(0, f64arr.length, MAX_DIMENSIONS);
    for (let i = 0; i < size; i += 1) {
      vsave(i, f64arr[i]);
    }
  };

  const load = (size) => {
    const f64arr = new Float64Array(size);
    for (let i = 0; i < size; i += 1) {
      f64arr[i] = linearMemory[i];
    }
    return f64arr;
  };

  const consumer = (arr, consume) => {
    const { length } = arr;
    save(arr);
    consume(length);
    return load(length);
  };

  // eslint-disable-next-line no-sequences
  const double = (arr, consume) => (save(arr), consume(arr.length));

  const vec = {
    abs: arr => consumer(arr, vabs),
    acos: arr => consumer(arr, vacos),
    acosh: arr => consumer(arr, vacosh),

    len: arr => double(arr, vlen),
    len2: arr => double(arr, vlen2),
  };

  return vec;
};
