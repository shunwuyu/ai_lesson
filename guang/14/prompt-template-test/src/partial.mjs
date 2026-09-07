import { pipelinePrompt } from "./pipeline-prompt-template.mjs";

const pipelineWithPartial = await pipelinePrompt.partial({
    company_name: '星航科技',
    company_values: '「极致、开放、靠谱」的价值观',
    tone: '偏正式但不僵硬',
});

const partialFormatted = await pipelineWithPartial.format({
    team_name: 'AI 平台组',
    manager_name: '刘东',
    week_range: '2025-02-10 ~ 2025-02-16',
    team_goal: '上线周报 Agent 到内部试用环境，并收集反馈。',
    dev_activities:
        '- 小明：完成 Git/Jira 集成封装\n' +
        '- 小红：实现 Prompt 配置化加载\n' +
        '- 小强：接入权限系统，支持按部门过滤数据',
});

const partialFormatted2 = await pipelineWithPartial.format({
    team_name: 'AI 工程效率组',
    manager_name: '王强',
    week_range: '2025-02-17 ~ 2025-02-23',
    team_goal: '打通 CI/CD 可观测链路，并推动落地到核心服务。',
    dev_activities:
        '- 阿俊：完成流水线执行数据的链路追踪接入\n' +
        '- 小白：梳理核心服务发布流程，补齐变更记录\n' +
        '- 小七：研发发布回滚一键脚本 PoC 版本',
});

console.log(partialFormatted);
console.log('\n================ 分割线：第二份周报模板 ================\n');
console.log(partialFormatted2);