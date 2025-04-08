通过 window.performance API，开发者可以深入了解网页的性能表现，识别问题并进行优化，从而提升用户体验。在面试中，展示你对这些概念的理解和实际应用能力将有助于给面试官留下深刻印象。

// 记录开始时间
performance.mark('start');

// 执行某段代码
// ...

// 记录结束时间
performance.mark('end');

// 测量时间
performance.measure('My Measurement', 'start', 'end');

// 获取测量结果
const measures = performance.getEntriesByName('My Measurement');
console.log(measures);