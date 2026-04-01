// mock/data.js
import Mock from 'mockjs';

const TOTAL = 210;

const list = Mock.mock({
  [`list|${TOTAL}`]: [
    {
      id: '@id',
      title: '@ctitle(5,10)',
      width: 200,
      height: '@integer(200,400)',
      ratio() {
        return this.height / this.width;
      },
      img() {
        // 随机颜色色块 SVG（直接渲染，不依赖外网）
        const color = Mock.Random.color();
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${this.width}' height='${this.height}'%3E%3Crect width='100%25' height='100%25' fill='${color}'/%3E%3C/svg%3E`;
      }
    }
  ]
}).list;

export function getPageData(page, size) {
  const start = (page - 1) * size;
  const end = start + size;
  return {
    list: list.slice(start, end),
    hasMore: end < TOTAL
  };
}