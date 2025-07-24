// utils.js
export function throttle(func, delay) {
  let lastCall = 0;
  let timer = null;

  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        lastCall = Date.now();
        func.apply(this, args);
        timer = null;
      }, delay - (now - lastCall));
    }
  };
}