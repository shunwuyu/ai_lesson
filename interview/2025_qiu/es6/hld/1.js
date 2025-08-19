// 休眠
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function trafficLight() {
  const seq = [
    { color: 'red', ms: 1000 },
    { color: 'yellow', ms: 3000 },
    { color: 'green', ms: 2000 },
  ];

  while (true) {
    for (const { color, ms } of seq) {
      console.log(color);     // 到这个灯就输出颜色
      await sleep(ms);        // 保持该颜色 ms 毫秒
    }
  }
}

trafficLight();
