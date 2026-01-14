type ThrottleFunction = (...args: any[]) => void;

export function throttle(fun: ThrottleFunction, delay: number): ThrottleFunction {
  let last: number | undefined;
  let deferTimer: NodeJS.Timeout | undefined;

  return function (...args: any[]) {
    const now = +new Date();

    if (last && now < last + delay) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fun(args);
      }, delay);
    } else {
      last = now;
      fun(args);
    }
  };
}
