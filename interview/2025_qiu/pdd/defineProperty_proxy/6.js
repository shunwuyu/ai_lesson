const obj = {
  x: 10,
  getX() {
    return this.x;
  }
};

const proxy = new Proxy(obj, {
  get(target, key, receiver) {
    // ❌ 直接用 target[key]() 会丢失 this
    // return target[key]();

    // ✅ 使用 Reflect.get 保持 this 上下文
    return Reflect.get(target, key, receiver);
  }
});

console.log(proxy.getX()); // 10
