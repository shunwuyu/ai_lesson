// 创建一个 Observable
// 订阅发布模式，Observable 对象是发布者，subscriber 对象是订阅者
import { Observable } from 'rxjs';
// 创建一个 Observable 对象
// 参数是一个回调函数，回调函数接收一个 subscriber 对象
// subscriber 对象有三个方法：next、error、complete
// next 方法用于发送数据
// error 方法用于发送错误
// complete 方法用于完成数据流
// subscriber可以理解为订阅者，可以订阅 Observable 对象
const stream = new Observable((subscriber) => {
  subscriber.next('hello');
  subscriber.next('world');
  subscriber.complete();
});
// 订阅 Observable 对象
// 参数是一个回调函数，回调函数接收一个数据
// 回调函数会在 Observable 对象发送数据时执行
stream.subscribe((value) => {
  console.log(value);
});