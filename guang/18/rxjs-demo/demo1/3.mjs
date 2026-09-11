// 从rxjs导入创建操作符from、转换操作符map
import { from, map } from 'rxjs';
// from([1,2,3])：把数组转成数据流，依次吐出 1、2、3
from([1,2,3])
// 管道，用来串起多个处理函数，数据流过管道层层加工
  .pipe(
    map(x => x * 2)
  )
  // 订阅，启动流；console.log 简写，等价于 v => console.log(v)
  .subscribe(console.log);