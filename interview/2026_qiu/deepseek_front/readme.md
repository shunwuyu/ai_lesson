# DeepSeek 前端AI面试题

- DeepSeek、智谱等AI 大厂会怎么考察面试者？

先夯实前端基本功，再检验 AI 场景落地能力，看你能不能把前端技术和大模型能力结合，独立完成 AI 产品的工程实现。

## 一、 TypeScript 与类型系统

前端大型项目 react + ts, vue + ts , ts 也是Agent 开发语言之一。 

### 1. 如何用 TypeScript 的模板字面量类型（Template Literal Types）约束 AI 返回的特定格式字符串（如日期、ID）？

> 模板字面量类型就像给字符串定了个"模具"。你可以用 ${string}、${number} 这些占位符拼出想要的格式，只有长得跟模具一样的字符串才能通过类型检查，专门用来约束日期、ID 这类固定格式的字符串。

${string} 和 ${number} 是模板字面量类型里的类型占位符，它们规定了那个位置必须能转成对应类型的值。

```
type Greeting = `Hello, ${string}!`;

const a: Greeting = "Hello, TypeScript!"; //  通过
const b: Greeting = "Hi, TypeScript!";   //  报错，格式不对

type B = `id-${number}`;
const b1: B = "id-123";
const b2: B = "id-abc";// ❌ 报错，"abc" 不是数字
```

“模板字面量类型本质是在类型层面给字符串定一个‘模具’。比如 AI 需要返回 user-12345 这种 ID，就可以定义 type UserId = 'user-${string}'；需要返回日期，就可以定义 type ISODate = '${number}${number}${number}${number}-${number}${number}-${number}${number}'

它的好处是让非法格式在编译期就能被发现，也可以结合 infer 做类型层面的模式提取。

但它的局限是只在类型空间生效，不能替代运行时校验。对于 AI 返回的数据，通常还要用正则、Zod 或类型守卫做一次校验，这样才真正安全。”

infer 是 TypeScript 条件类型里的一个关键字，作用可以理解为：在类型层面做“模式匹配 + 提取”。

### 2. 请用 TypeScript 实现一个 “类型安全的 Prompt 模板解析器”，要求支持变量插值、类型校验与默认值。

Prompt 模板解析器：对带占位变量的 prompt 字符串做插值填充、校验变量类型，输出最终给大模型的提示词。
LangChain 使用PromptTemplate|ChatPromptTemplate

因为传变量时容易传错类型、漏传参数；类型安全就是 TS 提前拦住，不让错误数据灌进 prompt 里传给大模型。

回答：

面试官您好，这个需求在 LLM/Agent 场景很常见：我们写 prompt 模板里面埋变量，比如`你是一个{role}，请用{language}回答问题：{question}`，如果传参漏了、传错类型（本该数字传字符串），拼出来的 prompt 就乱了，甚至让模型输出异常。
普通字符串模板只是简单替换，没有约束；**类型安全 Prompt 模板解析器，就是用 TS 泛型锁定模板入参结构，渲染前做参数校验、缺参数自动填充默认值，最后输出完整 prompt**。




### 3. 在定义 AI 接口返回的嵌套数据结构（如多轮对话、工具调用结果）时，如何用 TypeScript 的泛型与条件类型实现灵活的类型推导？



**场景痛点**
- **嵌套异构**：一条消息可能是普通文本、也可能是工具调用（`tool_call`）、工具返回结果（`tool_result`），不同类型字段不一样；

## 二、 流式处理与实时通信
## 三、 前端状态管理与数据流
## 四、 性能优化与渲染
## 五、 前端AI 架构设计
## 六、AI 特性与前端工程实战
### 1. 在前端实现一个 Agent 循环时，如何管理工具调用的异步执行、超时处理与结果合并？

- 前端还实现 Agent Loop吗？

前端可做轻量 Agent 循环， 用 Promise 管控异步、超时、收集工具结果。

考的其实不只是 Promise、async/await，不要一上来就说 Promise.all，(并发执行) 而是你有没有真正设计过一个**能稳定运行的 Agent 执行引擎**。

结合一个具体场景来讲， “帮我查一下北京的天气，再搜索附近适合吃饭的餐厅，最后给我一个建议”。
AI 先调用天气工具和搜索工具，再根据执行结果决定是否继续调用其他工具，最后整合信息给用户。
这个过程就叫 Agent Loop（Agent 循环）。

- 讲清楚架构，再讲具体实现

```
我会先把 Agent 循环拆成几个阶段：模型决策、工具调度、异步执行、结果收集、结果回传给模型(会话历史)，以及判断是否结束。

比如用户问“帮我查北京天气，再推荐适合吃饭的地方”，模型可能一次返回两个工具调用：一个查天气，一个搜索餐厅。

这时候，我会重点考虑三个问题。

第一，工具怎么执行？如果两个工具互不依赖，就可以并发执行；如果后一个工具依赖前一个工具的结果，就需要串行执行。

第二，工具执行不了怎么办？比如天气接口一直不返回，或者搜索服务报错，我不能让整个 Agent 永远卡住，所以要设计超时、错误处理和必要的重试机制。

第三，执行完怎么合并结果？我不能只把几个 Promise 的结果拼起来，而是要保留每次工具调用的 ID、执行状态和原始结果，按照模型要求的格式回传，让模型能够准确知道每个工具调用对应的结果。

最后，我还会设置最大循环次数、总执行时间和工具调用权限，避免 Agent 陷入无限循环，或者执行不安全的操作。
```
- 整体架构应该怎么设计？

1. 接收用户问题
初始化对话、循环次数、总时间预算

2. 请求 AI 模型
获取文本回复，或一个 / 多个工具调用

3. 校验并调度工具
检查参数、权限、并发限制和依赖关系

4. 执行工具并收集结果
超时控制、错误隔离、结果关联与合并

5. 把工具结果回传给模型
追加完整的工具调用记录和结果消息
6. 判断是否结束
最终回答 → 结束；继续调用工具 → 下一轮

Agent 循环不等于无限调用模型，而是一个有状态、有预算、有退出条件的状态机。

每一轮模型返回后，我们都要判断：
  - 模型是否已经给出最终答案？
  - 是否需要调用工具？
  - 工具调用是否合法？
  - 当前是否已经达到最大轮数或时间预算？

如果忽略这些判断，Agent 很容易出现重复调用工具、无限循环、请求堆积等问题。

- 工具异步执行：串行还是并发？

  ```
  const toolCalls = [
  {
    id: "call_001",
    name: "getWeather",
    arguments: { city: "北京" },
  },
  {
    id: "call_002",
    name: "searchRestaurants",
    arguments: { city: "北京" },
  },
];
  ```
  这两个工具没有依赖关系，可以并发执行。

  面试时我会强调：并发策略应该由工具之间的依赖关系决定，而不是简单地把所有工具都丢给 Promise.all。

  但如果模型先调用 getWeather，然后根据天气结果决定搜索室内还是室外餐厅，就必须分成两步执行。（室内游玩项目）
  优点是速度快。 假设两个工具分别需要 2 秒和 3 秒：
- 串行执行：大约 5 秒。
- 并发执行：大约 3 秒。

  但是，Promise.all 有个问题：其中一个 Promise reject，整个 Promise.all 就会 reject。
  例如，天气服务失败了，搜索餐厅本来可以成功，但我们可能无法正常拿到全部结果。

  对于 Agent 来说，我通常希望每个工具都有独立的执行状态，因此更倾向于使用 Promise.allSettled，或者把每个工具单独包装成永不 reject 的结果。

  ```
  // 包装工具：永不 reject 包装 Promise，捕获内部异常，永远 resolve 一个结构化状态对象
function safeToolRun<T>(toolPromise: Promise<T>) {
  return toolPromise
    .then(data => ({ ok: true, data, error: null }))
    .catch(err => ({ ok: false, data: null, error: err }));
}
  ```
  ```
  const settled = await Promise.allSettled(
  toolCalls.map(call => executeTool(call))
);
  ```
  这样可以分别处理成功和失败，而不是让某个工具的异常直接打断整批工具调用。
  不过要注意：Promise.allSettled 只是收集结果，并不会自动限制并发数量，也不会自动处理超时

  2. 有依赖关系：分阶段执行
  ```
  获取天气
   ↓
根据天气决定搜索条件
   ↓
搜索餐厅
   ↓
合并结果
  ```
  ```js
  const weather = await getWeather({
  city: "北京",
});

const restaurants = await searchRestaurants({
  city: "北京

  如果请求超",
  preference: weather.temperature > 25
    ? "室内"
    : "户外",
});
  ```
  - 超时处理：不能只给 Promise 加一个计时器
  假设天气接口一直没有返回，如果直接：
  ```
  const result = await getWeather({
  city: "北京",
});
  ```
  Agent 就可能一直等待。
  
  我们需要设置超时。但这里要区分两个概念：
  - 超时返回：调用方不再等待这个结果。
  - 真正取消任务：底层网络请求或计算任务停止执行

  1. 推荐方案：AbortController
  对于支持 AbortSignal 的 fetch，可以使用 AbortController 取消请求。

  ```
  async function fetchWithTimeout<T>(
  url: string,
  timeoutMs: number,
): Promise<T> {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error: ${response.status}`,
      );
    }

    return await response.json() as T;
  } finally {
    clearTimeout(timer);
  }
}
  ```
  ```
  interface WeatherResult {
  city: string;
  temperature: number;
}

const weather = await fetchWithTimeout<WeatherResult>(
  "/api/weather?city=北京",
  5000,
);
  ```过 5 秒，浏览器会尝试中止该请求，并使 fetch 以异常结束。

这段代码的关键不是定时器本身，而是把 signal 传给底层请求。

如果底层工具完全不支持取消，那么即使外层使用超时 Promise，也只能停止等待，无法保证底层任务真的停止。

另外，response.json() 的解析过程也不会因为这个 AbortController 自动变成一个可随时中断的计算任务。要控制更复杂的执行过程，需要各层配合取消机制。

ai_lesson/interview/2025_qiu/es6/hld/abortDemo

2. 还要考虑 Agent 的总时间预算
假设每个工具最多执行 5 秒，Agent 最多循环 10 轮。
这并不代表整个请求一定在 50 秒内结束，因为每轮还有模型请求、排队等待以及其他处理开销。

我通常会区分：

```
限制	作用
单工具超时	防止某个工具长时间无响应
单轮超时	控制一批工具执行的时间
Agent 总时限	限制整次任务的最大执行时间
最大循环次数	防止模型反复请求工具
并发上限	防止大量工具同时执行，耗尽浏览器或后端资源
```

如果用户主动取消任务，也应该把取消信号传递给当前模型请求和所有支持取消的工具，而不只是隐藏界面上的 loading。

结果合并：为什么不能简单地把结果拼起来？

假设两个工具执行完了：

```
const weather = {
  temperature: 22,
  weather: "晴天",
};

const restaurants = {
  items: ["餐厅 A", "餐厅 B"],
};
```
你可能会想直接：
const merged = {
  ...weather,
  ...restaurants,
};

这种合并方式只适合某些简单的数据处理场景，不适合作为通用的 Agent 工具结果合并机制。

原因有三个：
1. 字段可能重名，后面的数据会覆盖前面的数据。
2. 结果可能来自多个不同工具，必须保留每个结果的来源。
3. AI 模型通常要求工具结果和工具调用 ID 对应，不能只返回一个合并后的普通对象。
正确的思路是：先逐个收集结果，再按工具调用 ID 关联，最后按照模型协议组织消息。

统一工具执行结果
我们可以定义一个执行结果类型：

```
type ToolExecutionResult =
  | {
      callId: string;
      status: "success";
      data: unknown;
    }
  | {
      callId: string;
      status: "error";
      error: {
        code: string;
        message: string;
      };
    };
```
为什么使用 unknown？未知类型
因为不同工具的返回值可能完全不同。统一调度层不需要假设所有结果都是天气、餐厅或者用户信息；只有具体业务处理层才需要进一步校验和使用对应的数据。


2. 让单个工具的失败不会影响其他工具

```
async function executeSafely(
  call: {
    id: string;
    name: string;
    arguments: unknown;
  },
): Promise<ToolExecutionResult> {
  try {
    const data = await executeWithTimeout(
      call,
      5000,
    );

    return {
      callId: call.id,
      status: "success",
      data,
    };
  } catch (error) {
    return {
      callId: call.id,
      status: "error",
      error: {
        code: "TOOL_EXECUTION_FAILED",
        message:
          error instanceof Error
            ? error.message
            : "工具执行失败",
      },
    };
  }
}
```
这里的 executeWithTimeout 代表我们封装好的、带超时机制的工具执行函数。

3. 批量执行，并保持结果关联

```
async function executeBatch(
  calls: Array<{
    id: string;
    name: string;
    arguments: unknown;
  }>,
): Promise<ToolExecutionResult[]> {
  return Promise.all(
    calls.map(call => executeSafely(call)),
  );
}
```
由于这里的每个 executeSafely 都会捕获执行异常，所以普通的工具执行失败会变成结构化结果，不会直接让整批任务 reject。

而且，Promise.all 返回的结果顺序与输入数组顺序一致，即使后发起的工具先完成，也不会导致结果顺序错乱。

4. 按照模型协议组装消息

如果使用的模型 API 要求每个工具结果携带对应的 tool_call_id，就应该按照协议组织消息

```js
const toolMessages = results.map(result => ({
  role: "tool" as const,
  tool_call_id: result.callId,
  content: JSON.stringify(
    result.status === "success"
      ? {
          ok: true,
          data: result.data,
        }
      : {
          ok: false,
          error: result.error,
        },
  ),
}));
```
这样，模型下一轮就能知道：天气工具成功了，餐厅搜索工具超时了，并决定是给出部分答案、重新尝试，还是换一种方式继续处理。

我认为 Agent Loop 的核心不是简单地循环调用大模型，而是构建一个可控的异步任务调度系统。模型负责决定下一步做什么，前端或执行层负责校验、调度和执行工具，再把带有明确关联关系的结果回传给模型。通过并发控制、超时取消、错误隔离和预算限制，才能让整个流程既高效，又稳定、可追踪。


## 七、 AI 工程化与前端工具链
## 八、 大模型前端集成