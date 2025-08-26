// 为了复用性
// function getFirstElement(arr: any[]): any {
//     return arr[0];
// }
  
// // 使用
// const numbers = [1, 2, 3];
// const firstNum = getFirstElement(numbers); // ❌ 类型是 `any`！

// firstNum.toFixed(2); // ✅ 能运行（数字有 toFixed）
// firstNum.push(4);    // ❌ 运行时报错！但 TypeScript 不报错！

// 接受类型参数
function getFirstElement<T>(arr: T[]): T | undefined {
    return arr.length > 0 ? arr[0] : undefined;
}
  
  // 使用
  const numbers = [1, 2, 3];
  const firstNum = getFirstElement(numbers); // ✅ 类型是 `number | undefined`
  
  firstNum?.toFixed(2); // ✅ 类型安全！只有 number 才有 toFixed
  firstNum?.push(4);    // ❌ TypeScript 直接报错！数字没有 push 方法 ✅
  
  const strings = ["hello", "world"];
  const firstStr = getFirstElement(strings); // ✅ 类型是 `string | undefined`
  firstStr?.toUpperCase(); // ✅ 智能提示可用
  firstStr?.toFixed(2);    // ❌ TypeScript 报错！字符串没有 toFixed ✅