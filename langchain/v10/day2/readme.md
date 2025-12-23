# Output Parser

把大模型返回的原始文本（如无结构字符串），转换成可直接使用的结构化格式。 

## LLM 输出 ≠ 可用数据
- 你要让 LLM 输出「前端知识卡片」，
- 前端代码要直接消费，而不是人读
### 案例
- zod
先定义“数据形态”，再让模型对齐
- Parser 不会“约束模型”，只会“校验输出”
  Prompt 强约束 > Schema 本身

## 升级到 StructuredOutputParser
- JsonOutputParser 仅解析为 JSON 字典，前者更贴合业务对象。
- StructuredOutputParser 适配自定义结构化类型（类 / 枚举），



## 想法

- 用 LangChain 1.0 Runnable + Parser 稳定拿 JSON
- 知道 什么时候该 retry / 兜底
- 