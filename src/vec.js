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

  return vec;
}