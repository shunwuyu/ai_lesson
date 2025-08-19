function* sequence() {
    yield { color: 'red', ms: 1000 };
    yield { color: 'yellow', ms: 3000 };
    yield { color: 'green', ms: 2000 };
  }
  
  function run(genFactory) {
    let iter = genFactory();
    (function next() {
      const { value, done } = iter.next();
      if (done) iter = genFactory();      // 重新开始一轮
      const { color, ms } = value || iter.next().value;
      console.log(color);
      setTimeout(next, ms);
    })();
  }
  
  run(sequence);
  