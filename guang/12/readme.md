# 结构化大模型输出：output parser 还是 tool？

- 输出做控制?
    - 在 prompt 里描述下要什么格式，然后按照这种格式解析大模型返回的结果字符串
    - output parser 对这个思路做了封装



大模型被提示词（prompt）影响：你让它返回 JSON，它就习惯用 markdown 代码块包裹 JSON，方便人阅读。

怎么解决？
方案 1：正则清洗字符串（最常用）
\s 空字符串  * 0 或任意多个空格
const cleanJson = llmResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
const data = JSON.parse(cleanJson);

langchain 提供了 JsonOutputParser 和 StructuredOutputParser 来解析大模型返回的 JSON 字符串。

## JsonOutputParser

const parser = new JsonOutputParser(); // 实例化
parser.getFormatInstructions();//返回一段自然语言提示词，告诉大模型需要输出符合 JSON 格式的内容
parser.parse(llmResponse); // 解析大模型返回的字符串，返回 JSON 对象

JsonOutputParser 比较简单， 不需要提示词

## StructredOutputParser.mjs
    fromNamesAndDescriptions 指定字段和描述

这就是 output parser 的原理：

在 prompt 里加入格式描述，根据这个格式来解析响应。

当然，就像我们之前用 zod 来描述 tool 的参数格式一样：

Zod 是一款 TypeScript 优先的**数据校验库**，用于在运行时校验接口、表单等外部数据，自动推导对应的 TS 类型。


Tool 本身虽绑定执行函数，但 LLM 输出调用工具的入参 JSON，本身就是结构化数据；我们可只捕获该参数、不去执行函数，以此实现结构化输出解析。

完全可以不执行函数

可以看到，通过返回的 tool_calls 信息，也能拿到结构化的数据。

而且，这种方式比 output parser 更好。

因为模型训练的时候就保证了生成 tool calls 的参数一定是符合格式要求的，如果不符合，会重新生成。

那岂不是没必要用 output parser 了？

确实，如果只是要求结构化返回数据，用 tool 就行了。

所以，现在获取结构化数据一般会用 withStructuredOutput 这个 api

它会判断模型是否支持 tool calls，支持的话就用 tool 的方式获取结构化数据，否则用 output parser 的方式，不用我们自己去处理。

## 流式输出

那岂不是说 output parser 一般用不到了？

也不是，如果流式打印返回数据的场景，还是需要 output parser 的。

而且还有一些非 json 格式的，比如 XML、YAML 等格式的内容，也要用 output parser。

简单来说，调用 `stream` 开启流式返回，大模型不会一次性把全部结果发过来。
而是一小块一小块（chunk）往外吐文字。
`for await` 循环就一块一块接着，一边收一边打印到控制台，同时把文字拼起来存好。
等全部分片接收完毕，完整答案就到手了。

你可以把 `stream` 想象成**一根不停出水的水管**。

普通变量是一桶水，一下全给你；
而 stream 是水一点点往外流。

`for‑await‑of` 就是守在水管出水口，**有水出来就接住一块 (chunk)**，
没流完就一直等着、循环；水流结束循环自动停下。

把 invoke 换成 stream 方法就可以了，用 for await 打印异步返回的 chunk


可以看到，虽然我们是用的 stream 的流式方式打印的

但是用了 withStructuredOutput 之后，它会在 json 生成完通过校验后再返回（底层是 tool calls）。

所以只有一个 chunk 包含完整 json

这样明显不是真的流式啊。

OpenAI 的 Tool Call 结构化返回**本身就不支持增量流式 JSON 片段**

只有一个chunk 


因为这个没走 tool‑call，只是把格式要求写进提示词，模型直接输出 JSON 文本，片段直接透传给你。而 withStructuredOutput 默认用工具调用，LangChain 会等完整 JSON 校验完才返回。

流式输出的时候， 用Output parser 更适合。