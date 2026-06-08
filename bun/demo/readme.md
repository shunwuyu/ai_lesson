#  Bun

Bun 是比 Node.js 更快、开箱即用、零配置的 JS/TS 运行时 + 包管理器。

## 安装 Bun
- Windows
```
powershell -c "irm bun.sh/install/windows | iex"
如果不行就
$bunPath = "$env:USERPROFILE\.bun\bin"
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";$bunPath", "User")
```
- linux
```
curl -fsSL https://bun.sh/install | bash

export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
```

- 可以，Bun 原生支持 TypeScript，无需配置直接运行 ts 文件。
```ts
const name: string = "新手同学";
console.log(`你好，${name}，Bun 超快！`);
```
bun hello.ts

- add ts 函数
```
function add(a: number, b: number): number {
  return a + b;
}
```

## axios 案例
- 初始化项目
bun init -y

bun add axios 

main.ts
bun main.ts

运行todos 服务
server.ts 

Bun 被美国人工智能公司 Anthropic 收购了。

2025年12月，Anthropic 正式宣布完成了对高性能 JavaScript 运行时工具 Bun 及其背后团队的收购。

