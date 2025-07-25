[三个技巧让大模型超常发挥](https://time.geekbang.org/column/article/871656)

- Prompt 设计的关键
    - 大模型更好的结果
    - 节省token,降低成本

## 如何正确书写文本提示词

- 了解大模型
    具备理解复杂提示词的能力，尤其是大参数的模型。
    **说人话**
    把 AI 当作“人类”，给它明确清晰的指令就可以了
    Deepseek-R1 来说，你只要给它准确清晰的指令，它通过深入思考，通常就会做得非常优秀。
    我想给**初学者**讲前端**入门课**，帮我规划一个课程大纲。
    课程的难度和适用人群
    不过，Deepseek-R1 虽然非常强大，但是这个强大是来源于它的深度思考模式，这个模式需要花费更多的算力和推理时间，模型的价格也比较昂贵。
    我们想要在能力弱一些，甚至**参数规模较小**的模型下，依然得到不错的结果，就需要在提示词上多花一点功夫了

- 使用结构化提示词
    结构化提示词是将提示内容组织成清晰格式，提高AI理解和响应准确性的方式。
    **提示词框架**
    设计一组清晰且结构化的提示词，用以引导模型生成特定类型的输出。它有助于提高生成的准确性、相关性和质量，确保模型的回应更符合用户的需求。
    **场景**
    coze 智能体
    你是一位曾经就职于互联网头部企业的资深软件工程师和IT教育专家，擅长用通俗易懂的语言来给初学者讲解相应技术方向的基本概念和入门知识。

    根据用户的输入，整理一门入门级技术课程的大纲，要求：

    1. 注重基本概念和原理，为学员打下扎实基础
    2. 具有实操性，注重实用性
    3. 内容不要求大而全，要循序渐进，适合初级学员掌握
    4. 准备的案例简单而兼具趣味与挑战
    5. 展望未来，适当介绍一些新技术和技术趋势

    - 总结下结构
    角色（Role）- 任务（Task）- 结果（Result）

## 使用分步思考工作流

- 通用的
- 前端的参数
分步思考工作流有个独特的地方，那就是可以将任务颗粒度细化，让不同的智能体每次只专注于一件事，然后通过协作将内容汇总完成，这样做通常能够较大程度提升输出结果的质量。

由于大模型的注意力机制，一次交互更加适合集中精力处理一件明确的事情，这样的单点处理结果比同时处理多件事，能得到更好的效果。

但是一次处理多件事也有优点，就是相比于多个节点的工作流，它能节省 token 数量，也能节省推理的时间。

## 使用 JSON 输出

文本大模型有较强的推理能力，有时候我们不用描述太复杂的提示词，可以通过语义化的 JSON 格式来取巧地实现我们想要的内容效果。

所以在大多数情况下，采用 JSON 格式输出，能够获得比采用文本输出更加优质的内容。但是 JSON 也有一些问题，那就是它的结构特点，使得在输出 JSON 的同时，想要充分利用流式输出减少响应时间变得比较困难。

流式输出。 出彩。