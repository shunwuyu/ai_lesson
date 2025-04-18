function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
      let context = this;
      if(timer) clearTimeout(timer);
      timer = setTimeout(function() {
        fn.apply(context, args);
      }, delay);
    }
  }
  