// npx tsx 3.ts
// tsx 是一款快速转译执行 TS 文件的工具
const prompt = "你是一个{role}，请用{language}回答问题：{question}";
// `Record<K,V>` 是 TS 内置工具类型，表示**键为 K 类型、值为 V 类型的对象**。
type PromptVars = Record<string, string | number>;
// 告诉 TS，这个函数支持接收一个自定义类型 T
// 约束泛型 T 必须是 PromptVars 的子类型，锁定入参 vars 的类型。

function parsePrompt<T extends PromptVars>(
  template: string,
  vars: T,
  // TS 内置工具类型，把 T 所有属性全部变成可选
  defaults: Partial<T> = {},
): string {
  const values = { ...defaults, ...vars };

  return template.replace(
    // 一个或多个字母、数字、下划线
    /\{(\w+)\}/g,
    // 第一个参数是**完整匹配到的字符串**
    (_, key: string) => {
      if (!(key in values)) {
        throw new Error(`缺少变量：${key}`);
      }
      // 强制转换类型为字符串
      return String(values[key]);
    },
  );
}

// const result = parsePrompt<PromptVars>(
//   "你是一个{role}，请用{language}回答：{question}",
//   {
//     role: "AI 助手",
//     language: "中文",
//     question: "什么是 TypeScript？",
//   },
//   {
//     language: "英文",
//   },
// );

// console.log(result);

// try {
//   const failResult1 = parsePrompt(
//     "你是一个{role}，请用{language}回答：{question}",
//     {
//       role: "AI助手",
//       language: "中文"
//     },
//     { language: "英文" }
//   );
//   console.log(failResult1);
// } catch (err) {
//   console.error('❌案例1报错：', (err as Error).message);
// }

