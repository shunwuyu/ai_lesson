[source](https://time.geekbang.org/column/article/857271)

## 什么是ReAct
前端有react框架，llm 有ReAct思想。
ReAct = 思维链 + 外部工具调用(tool)
ReAct = Reasoning(推理) + Acting(行动)

- 思维链(chain of thought)
  - 大模型把大问题拆分成小问题, 一步步地解决，每一步都会尝试调用外部工具来解决问题，并且还会根据工具的反馈结果，思考工具调用是否出了问题。如果判断出问题了，大模型会尝试重新调用工具。这样经过一系列的工具调用后，最终完成目标。

  - 简单好理解, 一条提示词就可以搞定，在项目中很常用。

- 分析ReAct Prompt
  [LangChain prompt 仓库](https://smith.langchain.com/hub)
```
{instructions} 大模型设置人设

TOOLS:
------

You have access to the following tools:

{tools} 告诉大模型，使用 {tools} 中定义的工具 应该填入工具的描述

大模型按照规定的格式思考和回答问题
教大模型如何推理和规划
大模型在有了推理和规划能力后就变成了 Agent
To use a tool, please use the following format:

```
让大模型在接到提问后，先思考应该怎么做。
Thought: Do I need to use a tool? Yes
让大模型在工具列表中挑选工具来解决问题。因此{tools_name}
中填入工具的名称
Action: the action to take, should be one of [{tool_names}]
工具可以理解为函数，通常会有入参，这里就是让大模型提供入餐。
Action Input: the input to the action
在这里填入工具的执行结果，由大模型来判断结果是否有用。
Observation: the result of the action
```
因为 Agent 会将问题拆分成多个子问题，之后一个个的解决，因此从 Thought 到 Observation 的过程会执行 N 次，直到大模型认为得到了最终的答案。
When you have a response to say to the Human, or if you do not need to use a tool, you MUST use the format:

于是便有了第二个 Thought：大模型认为得到了最终的答案。Final Answer 就表示最终的答案。
```
Thought: Do I need to use a tool? No
Final Answer: [your response here]
```

Begin!
该模板还支持在 {chat_history} 中填入历史对话，方便大模型理解上下文。  
Previous conversation history:
{chat_history}

New input: {input}
最后还有一个 {agent_scratchpad}，这是一个 Agent 剪贴板，用于记录 Agent 的思考过程，可以不填，不影响整个 Agent 执行过程。
{agent_scratchpad}
```

ReAct 的执行过程是一个与人类交互的过程。在 Action 和 Action Input 中，大模型会告诉人类需要执行什么工具、以及工具的入参是什么，而具体的工具执行，需要由人类完成。

人类完成后，将工具执行结果填入到 Observation，反馈给大模型，直到大模型得到 Final Answer。

整个过程中，人类需要从 Action、Action Input 以及 Final Answer 中使用正则或字符串的方式取值。因此该模板是一个 StringPromptTemplate 类型的 prompt 模板。

## ReAct prompt 模板

