async function check() {
  try {
    // 检查 WebGPU 能力
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      throw new Error("WebGPU is not supported (no adapter found)");
    }
    // fp16_supported = adapter.features.has("shader-f16")
  } catch (e) {
    self.postMessage({
      status: "error",
      data: e.toString(),
    });
  }
}

async function load() {
  self.postMessage({
    status: "loading",
    data: "Loading model...",
  });
}

self.addEventListener("message", async (e) => {
  const { type, data } = e.data;
  switch (type) {
    case "check":
      check();
      break;
    case "load":
      load();
      break;
  }
})