# 在框架开发中闭包的应用 

- 单例模式
- hooks
    function useThrottle(fn: Function, delay = 300) {
  let timer: any = null;
  return (...args: any[]) => {
    if (!timer) {
      fn(...args);
      timer = setTimeout(() => (timer = null), delay);
    }
  };
}
- 缓存与记忆函数
    
