# 结构化大模型输出：output parser 还是 tool？

- 输出做控制?
    - 在 prompt 里描述下要什么格式，然后按照这种格式解析大模型返回的结果字符串
    - output parser 对这个思路做了封装

- normal.mjs 
    返回的内容带了额外的 markdown 语法，解析失败了。

- OutputParser
    json-output-parser.mjs

    虽然大模型返回的还是带了 markdown 语法，但是 JsonOutputParser 能够解析其中的 json。

    有的同学说，getFormatInstructions 好像没内容啊。确实，JsonOutputParser 比较简单，不需要提示词。

    StructuredOutputParser，它可以指定具体的 json 结构

    这就是 output parser 的原理：在 prompt 里加入格式描述，根据这个格式来解析响应。

- zod 描述复杂的对象格式


