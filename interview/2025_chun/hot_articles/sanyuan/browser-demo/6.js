function throttle(fn, delay) {
    // last：上次执行时间，用于节流判断。
    // timer：用于清除和重置防抖定时器。
    let last = 0, timer = null;
    return function (...args) {
        // 保留 this 和参数，用于后续 fn.apply() 调用。
      let context = this;
    //   now 是当前时间。
      let now = new Date();
    //   节流逻辑：如果两次调用间隔小于 delay，不立即执行。
      if(now - last < delay){
        clearTimeout(timer);
        // 但同时设置一个防抖的 setTimeout —— 确保最后一次操作会触发。
        setTimeout(function() {
          last = now;
          fn.apply(context, args);
        }, delay);
      } else {
        // 如果间隔已经够了，立刻执行一次（节流效果）。
        // 这个时候表示时间到了，必须给响应
        last = now;
        fn.apply(context, args);
      }
    }
  }
  

//   每隔 delay 执行一次，结束后还会再执行一次
// 快速触发时有响应，停止后还会响应一次
// 搜索建议、拖拽、滚动 + 最后一次触发处理 

//   举个例子（比如监听 scroll）
// 单纯节流：用户停下来时，不会再触发。

// 节流+防抖：用户停下来，最后还会触发一次（比如用于懒加载时加载最后一屏）。