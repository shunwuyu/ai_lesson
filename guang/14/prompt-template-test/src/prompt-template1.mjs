import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';

// 初始化模型
const model = new ChatOpenAI({
    modelName: process.env.MODEL_NAME,
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
    },
});

const naiveTemplate = PromptTemplate.fromTemplate(`
你是一名严谨但不失人情味的工程团队负责人，需要根据本周数据写一份周报。

公司名称：{company_name}
部门名称：{team_name}
直接汇报对象：{manager_name}
本周时间范围：{week_range}

本周团队核心目标：
{team_goal}

本周开发数据（Git 提交 / Jira 任务）：
{dev_activities}

请根据以上信息生成一份【Markdown 周报】，要求：
- 有简短的整体 summary（两三句话）
- 有按模块/项目拆分的小结
- 用一个 Markdown 表格列出关键指标（字段示例：模块 / 亮点 / 风险 / 下周计划）
- 语气专业但有一点人情味，适合作为给老板和团队抄送的周报。
`);

const prompt = await naiveTemplate.format({
    company_name: '星航科技',
    team_name: '数据智能平台组',
    manager_name: '刘总',
    week_range: '2025-03-10 ~ 2025-03-16',
    team_goal: '完成用户画像服务的灰度上线，并验证核心指标是否达标。',
    dev_activities:
        '- 阿兵：完成用户画像服务的 Canary 发布与回滚脚本优化，提交 27 次，相关任务：DATA-321 / DATA-335\n' +
        '- 小李：接入埋点数据，打通埋点 → Kafka → DWD → 画像服务的全链路，提交 22 次\n' +
        '- 小赵：完善画像服务的告警与Dashboard，新增 8 个告警规则，提交 15 次\n' +
        '- 小周：配合产品输出 A/B 实验报表，支持 3 条对外汇报用数据',
    });

// console.log('格式化后的提示词:');
// console.log(prompt);

const prompt2 = await naiveTemplate.format({
    company_name: '极光云科技',
    team_name: '订单结算后端组',
    manager_name: '陈总',
    week_range: '2025-04-07 ~ 2025-04-13',
    team_goal: '本周以稳定性为主，集中清理历史技术债和高频告警。',
    dev_activities:
      '- 老王：修复高优先级线上 Bug 7 个（包含两起支付超时问题），提交 19 次，关联工单：PAY-1024 / PAY-1056\n' +
      '- 小何：重构结算批任务调度逻辑，将执行时间从 35min 优化到 18min，提交 24 次\n' +
      '- 小陈：梳理告警策略，合并冗余告警 12 条，新增 SLO 监控 3 项，提交 16 次\n' +
      '- 实习生小刘：补齐历史接口的缺失单测，用例覆盖 12 个核心方法，整体覆盖率从 52% 提升到 61%',
  });
console.log('格式化后的提示词:');
console.log(prompt2);

const stream = await model.stream(prompt2);
console.log('\nAI 回答:');
for await (const chunk of stream) {
    process.stdout.write(chunk.content);
}
