https://time.geekbang.org/column/article/870510

- 工作流
    bedtime_story
    让AI给6-8岁孩子讲睡前故事

- 开始节点
- 大模型节点
    系统提示词

    目标
    你根据用户输入，分析并拆解出用于搜索的提示词，方便用户搜索需要的原文内容，这些内容用于后续为用户创作儿童故事。

    分析方法：如果用户原始输入是常见的民间故事主题或者经典预言故事，如三只小猪，狼来了，那么你的目的是查找这些故事的原文，生成方便查找故事原文的query。

    否则，你应当结合中国历史、文化或者神话传说，生成一些有助于根据原始输入信息搜索到参考资料的query。

    任务
    根据用户输入的提示词，分析用户的意图，输出一组搜索query词，以便让用户更好地搜索内容。

    用户提示词
    {{input}}

    output
    intent str.String
    querys Array<String>

    测试 龙

- 循环节点
    input  大模型  querys
    输出 response_for_model search-data

    添加 search 节点 
    input_query 循环input
- 大模型
    系统：
    你根据参考资料进行整理，撰写儿童故事草稿。

    注意：儿童故事的内容深浅要符合6-8岁儿童的年龄和理解力。如果是经典故事，尽可能忠于原文，否则可适当自由创作。
    用户：
    参考资料：{{input}}

    输出
    output  string

- 插件 语音中文文本转语音，选择柔美女声
    roumei_nvsheng
    text 引用 大模型1output

- 结束
    text 大模型1output
    audio file roumei_nvsheng

## 建立应用

儿童睡前故事
给6-8岁儿童讲睡前故事

根据用户输入的主题，调用bedtime_story工作流给孩子讲睡前故事。
工作流选择

