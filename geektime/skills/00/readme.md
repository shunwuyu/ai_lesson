## 给我3分钟，让你看到一种新的工作方式

- 开了一小时会，要用半小时整理会议纪要
    待办事项， 谁负责， 截止时间

- skill-creator 
官方提供 
npx skills add https://github.com/anthropics/skills --skill skill-creator
符合官方规范的skill 

skill-creator：一个帮助 Agent 根据已有任务或工作流程，自动生成可复用 Skill（包括 skill.md、提示词和所需文件结构）的 Skill，用于把一次性的能力沉淀成可重复使用的插件。

请帮我创建一个skill，这个skill用于生成会议纪要
根据用户提供的文字稿，生成会议纪要，具体流程为：
先通读全文，去除停顿词等与会议无关内容
结构化输出：
会议基本信息（时间，地点，人物）
会议目标（目的/预期，背景信息）
会议内容（按主题划分，讨论了什么，观点是什么）
行动项（谁在何时需要做什么）
不确定的内容请留空
请将技能创建在当前工作目录的 ./.claude/skills 文件夹中

@meeting_content.txt 帮我总结下会议记录