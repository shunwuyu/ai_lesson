// 异步生成器，一边await等待，一边yield往外输出
async function* produce() {
  yield "第1段";
  await new Promise(r => setTimeout(r, 1000)); // 模拟等待数据
  yield "第2段";
  await new Promise(r => setTimeout(r, 1000));
  yield "第3段";
}

// 调用方用 for‑await‑of 循环接收每一段输出
(async () => {
  for await (const item of produce()) {
    console.log("收到：", item);
  }
})();
