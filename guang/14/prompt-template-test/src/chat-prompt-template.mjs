import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';

const model = new ChatOpenAI({
  modelName: process.env.MODEL_NAME,
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  configuration: {
    baseURL: process.env.OPENAI_BASE_URL,
  },
});


const chatPrompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    `你是一名资深工程团队负责人，擅长用结构化、易读的方式写技术周报。
写作风格要求：{tone}。

请根据后续用户提供的信息，帮他生成一份适合给老板和团队同时抄送的周报草稿。`,
  ],
  [
    'human',
    `本周信息如下：

公司名称：{company_name}
团队名称：{team_name}
直接汇报对象：{manager_name}
本周时间范围：{week_range}

本周团队核心目标：
{team_goal}

本周开发数据（Git 提交 / Jira 任务等）：
{dev_activities}

请据此输出一份 Markdown 周报，结构建议包含：
1. 本周概览（2-3 句话）
2. 详细拆分（按项目或模块分段）
3. 关键指标表格（字段示例：模块 / 亮点 / 风险 / 下周计划）

语气专业但有人情味。`,
  ],
]);

const chatMessages = await chatPrompt.formatMessages({
  tone: '专业、清晰、略带鼓励',
  company_name: '星航科技',
  team_name: '智能应用平台组',
  manager_name: '王总',
  week_range: '2025-05-05 ~ 2025-05-11',
  team_goal: '完成内部 AI 助手灰度上线，并确保核心链路稳定。',
  dev_activities:
    '- 小李：完成 AI 助手工单流转能力，对接客服系统，提交 25 次\n' +
    '- 小张：接入日志检索和知识库查询，提交 19 次\n' +
    '- 小王：完善监控、告警与埋点，新增 10 条核心告警规则\n' +
    '- 实习生小陈：补充使用文档和 FAQ，支持 3 个内部试点团队',
});

console.log('ChatPromptTemplate 生成的消息:');
console.log(chatMessages);

const response = await model.invoke(chatMessages);

console.log('\nAI 生成的周报草稿:');
console.log(response.content);

