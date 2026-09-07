import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import {
  FewShotPromptTemplate,
  PromptTemplate,
} from '@langchain/core/prompts';

// 1. 初始化 Chat 模型
const model = new ChatOpenAI({
  modelName: process.env.MODEL_NAME,
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  configuration: {
    baseURL: process.env.OPENAI_BASE_URL,
  },
});

// 2. 定义 few-shot 示例模板（单条示例长什么样）
const examplePrompt = PromptTemplate.fromTemplate(
  `用户输入：{user_requirement}
期望周报结构：{expected_style}
模型示例输出片段：
{report_snippet}
---`
);

// 3. 准备几条示例数据（few-shot examples）
const examples = [
  {
    user_requirement:
      '重点突出稳定性治理，本周主要在修 Bug 和清理技术债，适合发给偏关注风险的老板。',
    expected_style: '语气稳健、偏保守，多强调风险识别和已做的兜底动作。',
    report_snippet:
      `- 支付链路本周共处理线上 P1 Bug 2 个、P2 Bug 3 个，全部在 SLA 内完成修复；\n` +
      `- 针对历史高频超时问题，完成 3 个核心接口的超时阈值和重试策略优化；\n` +
      `- 清理 12 条重复/噪音告警，减少值班同学 30% 的告警打扰。`,
  },
  {
    user_requirement:
      '偏向对外展示成果，希望多写一些亮点，适合发给更大范围的跨部门同学。',
    expected_style: '语气积极、突出成果，对技术细节做适度抽象。',
    report_snippet:
      `- 新上线「订单实时看板」，业务侧可以实时查看核心转化漏斗；\n` +
      `- 首次打通埋点 → 数据仓库 → 实时服务链路，为后续精细化运营提供基础能力；\n` +
      `- 和产品、运营一起完成 2 场内部分享，会后收到 15 条正向反馈。`,
  },
];

// 4. 把示例封装成 FewShotPromptTemplate
const fewShotPrompt = new FewShotPromptTemplate({
  examples,
  examplePrompt,
  prefix:
    `下面是几条已经写好的【周报示例】，你可以从中学习语气、结构和信息组织方式：\n`,
  suffix:
    `\n基于上面的示例风格，请帮我写一份新的周报。` +
    `\n如果用户有额外要求，请在满足要求的前提下，尽量保持示例中的结构和条理性。`,
  inputVariables: [],
});

const fewShotBlock = await fewShotPrompt.format({});
console.log(fewShotBlock);

