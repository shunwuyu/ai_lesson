// finally 不会改变原来的 resolve/reject 结果
Promise.resolve(42).finally(()=>{}).then(v=>console.log(v))