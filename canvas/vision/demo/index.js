// // 获得 canvas 容器元素
// const canvas = document.getElementById("canvas");

// // 设置 canvas 的样式宽高
// // 样式宽高决定了 canvas 在画布上呈现的大小
// canvas.style.width = 400 + "px";
// canvas.style.height = 200 + "px";

// // 设置 canvas 画布宽高
// // 这个宽高是可以绘制区域的大小
// // 样式宽高是默认等于画布宽高的
// canvas.width = 400;
// canvas.height = 200;

// // 获得绘制的上下文
// // 之后的 API 都是通过调用 context
// const context = canvas.getContext("2d");

// context.fillStyle = "red"; // 设置填充颜色
// context.strokeStyle = "yellow"; // 设置边框的颜色
// context.lineWidth = 10; // 设置边框的宽度
// context.strokeRect(0, 0, 100, 100); // 绘制边框
// context.fillRect(5, 5, 95, 95); // 绘制填充颜色

// // 绘制一段文字
// context.fillStyle = "black"; // 设置文字的颜色
// context.font = "25px PingFangSC-Regular, sans-serif"; // 设置文字的大小和字体
// context.fillText("hello world", 150, 100);

// context.fillStyle = "red";
// context.fillRect(0, 0, 50, 50);

// // 进行一系列坐标变换
// context.fillStyle = "blue";
// context.translate(50, 50);
// context.rotate(-Math.PI / 6);
// context.scale(2, 3);
// context.fillRect(0, 0, 50, 50);

// ch03/barchart/canvas/index.js

const canvas = document.getElementById("container-canvas");
canvas.style.width = containerWidth + "px";
canvas.style.height = containerHeight + "px";

// 下面把画布宽高设置为样式宽高的两倍主要是为了解决模糊问题
// 这个地方就不详细展开了，感兴趣的可以自行查阅
canvas.width = containerWidth * 2;
canvas.height = containerHeight * 2;

const context = canvas.getContext("2d");
context.scale(2, 2); // 抵消将画布宽高设置为样式宽高两倍的影响

context.translate(margin, margin); // 将坐标原点移动到绘制图表的区域

for (const index of indices) {
  // 将需要绘制的属性取出来
  const color = colors[index];
  const x = xs[index];
  const barHeight = barHeights[index];
  const value = values[index];
  // 绘制条
  context.fillStyle = color;
  context.fillRect(x, y - barHeight, barWidth, barHeight);

  // 绘制值
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "white";
  context.font = "25px PingFangSC-Regular, sans-serif";
  context.fillText(value, x + barWidth / 2, y - barHeight / 2);
}
