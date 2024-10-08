const { Readable } = require('stream');

class MyReadableStream extends Readable {
  constructor(options) {
    super(options);
    this.index = 0;
  }
  // 用于生成数据并推送到流中
  _read() {
    this.index += 1;
    if (this.index > 10) {
      this.push(null); // 结束流
    } else {
      const chunk = `Chunk ${this.index}\n`;
      this.push(chunk);
    }
  }
}

const myStream = new MyReadableStream();

myStream.on('data', (chunk) => {
  console.log(chunk.toString());
});

myStream.on('end', () => {
  console.log('Stream ended');
});