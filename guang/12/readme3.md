# Output Parser 实战：智能录入 + 流式版 mini cursor 

借助 tool 强制函数调用，模型天然返回结构化 JSON，解析更稳定，不易出现格式错乱，可靠性高于提示词约束。

部分模型不支持工具调用，这时就只能靠 Output Parser + 提示词，事后校验修正输出格式，兜底实现结构化。

前面学了大模型的输出控制：

用 model.withStructuredOutput 来控制输出的结构，它底层会根据模型来决定用 tool 或者 output parser，确保输出一定是符合格式要求的。

一般用 withStructuredOutput 就可以了，但当流式返回内容的时候，如果要实现打字机效果，就要直接用 output parser 了，比如 tool 参数的流式打印。

