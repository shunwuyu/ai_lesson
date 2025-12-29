- FunctionCall 实现本地文件搜索查看工具

- Agentic AI 演进过程、定义、核心组件、工作流程
  站在人类的角度
  三个阶段： 
  1. 信息工具、
    chatgpt deepseek 信息参考，如果不够实时，会联网、rag 
    本身是基于当前token, 预测下一个token 
    会存在大量的失真、幻觉的问题。
    - 工作时长没有减少
    - 工作成果没有改善
  2. 辅助工具
    辅助驾驶、语音助手、Copilot 提升现有产品的竞争力，改善用户体验
    无法独立完成工作

  3. 生产工具
  这是我们的期待，替代一些专业工作，实现执行合一。
  操作电脑、物理世界、调用API、自主决策、策略推进
  Ai coding cursor、Claude Code 
  无人驾驶
  
## 2025年Q3 季度智能体的发展
  - Agent 是兵家必争之地
  - 更长周期的工具调用、多步骤工作负载 （记忆、自主规划）
  - 开源模型
    GPT-O33-120B  20B OpenAI 开源
  - 云和语音达到生产可用
  - 图片编辑视屏生成达到一个主流

## Agent 定义
- Anthopic 大语言模型不再是被动响应指令，而是能主动规划、调用工具并控制任务执行流程，具备一定的自主性。
- OpenAI 智能体代表能够智能地完成任务的系统，其任务范围从执行简单的流程到追求复杂、开放性目标。
总结 AI智能体是基于大语言模型（LLM）驱动的系统，能够自主运行并使用工具端到端地完成任务。

3.png 
- 大模型自主决策是直接回复用户指令，还是调用工具？
- 大模型拆分工作流程、调用工具、执行任务、验证是否完成任务

Agent=对话能力+推理能力+长记忆+工具调用
4.png 
AGI五个阶段， L1 chatgpt L2 DeepSeek R1  L3 Agent L4 发明创造 L5 组织里的组织者（协调多个智能体，完成复杂任务）

## AI 产品分类
- Generative AI （生成式AI）
基于提示生成新内容的模型（文本、图像、代码等）无状态或短期上下文
交互模式：
Prompt + Pattern Matching + Content Generation

- AI Agents(AI 代理)
  执行特定任务的软件程序，在预定义规则内观察环境、处理信息并采取行动
  工作流程：Observe + Process + Decide(Rule-based) + Act
- Agentic AI(智能体AI)
  整合了自主性、决策能力、记忆和学习能力的新型AI 范式，能够有目的地行动而非被动响应
  LangGraph 多智能体编排

5.png

## Agentic AI 核心组件
1. Planners 规划器
战略思考者，讲高层目标分解为可执行步骤
Global->Subtasks->Execution Plain
2. Executors (执行器)
实际执行者，运行脚本，触发管道，部署容器
Script Execution + API Calls + Tool Integration
3. Memory Modules （记忆模块）
持久化上下文存储， 保存历史模块和团队偏好
Vector DB + Context History + Pattern Recognition
4. Feedback Loops(反馈循环)
Monitor Metrics->Evaluate + Adapt Strategy

While(Goal Not Achieved):
  1. Perceive(Environment)
  2. Reason(Context, Memory)
  3. Act(Tools, APIs)
  4. Learn(Feedback) -> Update(Strategy)

7.png 


- 实战：用提示词驱动工具调用
使用最简单的提示词构建一个工具智能体
让智能体去调用工具
1. 对提示词进行约束，对输出约定
  工具名称和参数信息
2. 解析器从输出中提取工具名和参数，分派到本地函数进行执行
3. 自我修正
  解析失败时讲错误信息写回记忆，下一轮根据错误反馈进行修正
4. 终止机制
  通过terminate 工作输出任务总结并结束循环，保证流程可控退出。




- 实战：基于函数调用的工具智能体
- 理解 MCP 协议，实战天气查询工具集成
- 不使用框架构建一个简单的 ReAct Agent