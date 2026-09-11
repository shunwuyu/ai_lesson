// RxJS 就是一套用来**优雅管理各种异步数据流**的工具，
// 网络请求、定时器、点击事件都能当成流来统一处理。
// from 是RxJS的创建类操作符，作用：
// 把【数组、Promise、可迭代对象等】转换成 Observable（可观察流）
import { from } from 'rxjs';
// Observable { _subscribe: [Function (anonymous)] }
// from([1,2,3])：接收数组，数组里面每一个元素会依次作为流的数据发射出来
// stream 就是一个 Observable 实例，它**只是定义了数据流，不会立刻执行**（懒执行）
const stream = from([1,2,3]);
console.log(stream);

// 2. 订阅 Observable
// subscribe 就是【订阅】，只有调用 subscribe 之后，Observable 才会开始发射数据
// 回调函数是 next 处理器：当流发射一个普通数据时，这个函数就会执行，v 就是发射的值
stream.subscribe(v => console.log(v));