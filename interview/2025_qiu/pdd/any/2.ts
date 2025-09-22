let u: unknown;
u = 123;
u = 'world';

u.toFixed();  // ❌ 报错，必须先判断类型
if (typeof u === 'number') {
  u.toFixed(); // ✅ 安全调用
}
