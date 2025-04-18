// 定时器版
function throttle(fn, interval) {
    let flag = true;
    return function(...args) {
      let context = this;
      if (!flag) return;
      flag = false;
      setTimeout(() => {
        fn.apply(context, args);
        flag = true;
      }, interval);
    };
  };
  
// 时间戳版
  const throttle = function(fn, interval) {
    let last = 0;
    return function (...args) {
      let context = this;
      let now = +new Date();
      // 还没到时间
      if(now - last < interval) return;
      last = now;
      fn.apply(this, args)
    }
  }
  