function useThrottle(fn: Function, delay = 300) {
    let timer: any = null;
    return (...args: any[]) => {
      if (!timer) {
        fn(...args);
        timer = setTimeout(() => (timer = null), delay);
      }
    };
  }