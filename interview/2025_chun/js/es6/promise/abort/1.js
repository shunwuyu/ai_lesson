// 创建一个 AbortController 实例，用于控制请求的取消
// html5 功能
const controller = new AbortController();

// 获取 signal 对象，用于传递给 fetch 请求
const signal = controller.signal;

// 发起 fetch 请求，传入 signal 以便可以取消请求
fetch('https://api.github.com/users/shunwuyu', { signal })
  .then(res => res.json()) // 将响应转换为 JSON 格式
  .then(console.log) // 打印获取到的数据
  .catch(err => {
    // 捕获错误
    if (err.name === 'AbortError') {
      // 如果错误是由于请求被中断引起的，打印相应信息
      console.log('请求已被中断');
    } else {
      // 处理其他类型的错误
      console.error('Fetch error:', err);
    }
  });

// 取消请求，调用 abort 方法
controller.abort(); // 这将中断 fetch 请求，并触发 AbortError
