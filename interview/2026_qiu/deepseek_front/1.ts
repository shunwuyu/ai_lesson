// tsc 1.ts --noEmit
// npm install -g typescript
// tsc index.ts && node index.js
type Greeting = `Hello, ${string}!`;

const a: Greeting = "Hello, TypeScript!"; //  通过
// const b: Greeting = "Hi, TypeScript!";   //  报错，格式不对

type B = `id-${number}`;
const b1: B = "id-123";
const b2: B = "id-abc";// ❌ 报错，"abc" 不是数字