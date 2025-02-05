//创建
console.log(new Date(2023, 6, 30));
// 因为 Date 的 month 是从 0 开始计数的，取值是 0 到 11：
// 调用 toLocaleString 来转成当地日期格式的字符串显示
console.log(new Date(2023, 6, 30).toLocaleString());
// 上个月的最后一天
console.log(new Date(2023, 6, 0).toLocaleString());
// -1 就是上个月的倒数第二天，-2 就是倒数第三天这样。
  console.log(new Date(2023, 6, -1).toLocaleString());
  // 这个小技巧有很大的用处，可以用这个来拿到每个月有多少天：
  console.log(new Date(2023, 1, 0).toLocaleString())
console.log(new Date(2023, 2, 0).toLocaleString())
console.log(new Date(2023, 3, 0).toLocaleString())
console.log(new Date(2023, 6, 0).toLocaleString())
console.log(new Date(2023, 7, 0).toLocaleString())
console.log(new Date(2023, 8, 0).toLocaleString())
// 年份
console.log(new Date().getFullYear())
// 月份
console.log(new Date().getMonth())
//  拿到星期几
console.log(new Date().getDay())