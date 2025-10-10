function polling(fn, condition, { interval = 2000, maxRetry = 5 } = {}) {
  let canceled = false;
  let count = 0;

  const execute = async (resolve, reject) => {
    if (canceled) return reject(new Error('Polling canceled'));

    try {
      const result = await fn();
      console.log(result);
      count++;
      if (condition(result)) return resolve(result);
      if (count < maxRetry) {
        setTimeout(() => execute(resolve, reject), interval * count); // 指数退避
      } else {
        reject(new Error('Max retry reached'));
      }
    } catch (err) {
      reject(err);
    }
  };

  const promise = new Promise(execute);
  promise.cancel = () => (canceled = true);
  return promise;
}


const fetchStatus = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      const done = Math.random() > 0.7;
      resolve({ status: done ? 'done' : 'pending' });
    }, 500);
  });
};

polling(fetchStatus, res => res.status === 'done', 1000, 5)
  .then(res => console.log('✅ 成功:', res))
  .catch(err => console.error('❌ 失败:', err.message));