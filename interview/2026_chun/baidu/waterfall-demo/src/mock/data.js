import Mock from 'mockjs';

export function getMockData(count = 20) {
  return Mock.mock({
    [`list|${count}`]: [
      {
        id: '@id',
        title: '@ctitle(5, 10)',

        // 先生成高度
        height: '@integer(200,400)',

        // 固定宽度
        width: 200,

        // 根据宽高计算 ratio（函数写法）
        ratio() {
          return this.height / this.width;
        },

        // 生成图片（使用同一个 height）
        img() {
          return `data:image/svg+xml,
          %3Csvg xmlns='http://www.w3.org/2000/svg' width='${this.width}' height='${this.height}'%3E
          %3Crect width='100%25' height='100%25' fill='%23${Mock.Random.color().slice(1)}'/%3E
          %3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='14'%3E
          ${this.width}x${this.height}
          %3C/text%3E
          %3C/svg%3E`;
        }
      },
    ],
  }).list;
}