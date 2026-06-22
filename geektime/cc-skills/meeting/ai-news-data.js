const NEWS_DATA = [
  {
    "title": "联想推出百应AI主机300：赋能中小企业的\"算力加速器\"",
    "description": "联想推出AI主机300，面向中小企业及超级个体，售价26999元。搭载AMD锐龙AI Max+395处理器、128GB内存与2TB SSD，以高性能硬件与深度AI平台解决成长型业务效率痛点。",
    "link": "https://www.aibase.com/zh/news/29022",
    "tags": ["AI硬件", "联想", "中小企业", "算力"]
  },
  {
    "title": "企业AI转型再添利器：青云科技算力云接入 MiniMax-M3 模型",
    "description": "青云科技旗下基石智算平台接入国产开源大模型MiniMax-M3，以卓越上下文处理能力等三大核心技术见长，依托自研架构助力企业便捷部署AI业务。",
    "link": "https://www.aibase.com/zh/news/29021",
    "tags": ["大模型", "MiniMax", "青云科技", "企业AI"]
  },
  {
    "title": "阿里AI内创黑马MuleRun走向前台：钉钉架构大调整，开启全员Agent时代",
    "description": "钉钉组织架构大调整，成立核心平台业务部并整合AI Agent团队，原悟空与MuleRun合并为新悟空团队，推动企业协同办公智能化。",
    "link": "https://www.aibase.com/zh/news/29019",
    "tags": ["Agent", "钉钉", "阿里巴巴", "协同办公"]
  },
  {
    "title": "一年跃升\"独角兽\"：Manifold AI 流形空间再获数亿元融资，加速世界模型落地",
    "description": "成立仅一年的世界模型公司Manifold AI宣布完成数亿元融资，获国新基金、毅峰资本、北汽产投及芯能创投等支持，四家老股东超额追加。",
    "link": "https://www.aibase.com/zh/news/29018",
    "tags": ["融资", "世界模型", "独角兽", "创投"]
  },
  {
    "title": "Kimi Work 迎重大升级：推出\"目标模式\"并打通外部应用插件",
    "description": "月之暗面旗下Kimi电脑客户端焕新升级，新增目标模式实现连续自主工作24小时，插件中心对接多家主流办公软件，6月全月Work模式消耗打5折。",
    "link": "https://www.aibase.com/zh/news/29017",
    "tags": ["Kimi", "月之暗面", "Agent", "办公"]
  },
  {
    "title": "Transformer 核心作者 Noam Shazeer 加盟 OpenAI，谷歌巨资未能挽留",
    "description": "Transformer架构核心作者诺姆·沙泽尔宣布加盟OpenAI。此前谷歌以约27亿美元技术许可费请回这位\"巫师\"，其迅速转投竞争对手引发AI人才战白热化。",
    "link": "https://www.aibase.com/zh/news/29016",
    "tags": ["OpenAI", "Google", "Transformer", "人才"]
  },
  {
    "title": "阿里开源统一科学大模型 LOGOS，仅用五十六分之一参数超越微软",
    "description": "阿里ATH-Token Foundry联合人大开源科学基础模型LOGOS，采用统一科学语法与纯序列建模范式，1B参数性能超越微软8×7B模型，覆盖六大科学任务。",
    "link": "https://www.aibase.com/zh/news/29015",
    "tags": ["开源", "科学大模型", "阿里", "LOGOS"]
  },
  {
    "title": "网易云音乐旗下AI情感陪伴App\"妙时\"宣布7月14日停运",
    "description": "网易云音乐旗下\"妙时\"AI情感陪伴应用将于7月14日全面停止服务，用户可在8月14日前申请退还剩余代币和会员费，并导出AI恋人聊天记录。",
    "link": "https://www.aibase.com/zh/news/29014",
    "tags": ["AI陪伴", "网易云音乐", "应用停运", "情感AI"]
  },
  {
    "title": "语音交互大升级：Claude 酝酿多语言支持，通话式体验呼之欲出",
    "description": "Anthropic正为Claude升级语音模式，突破英语限制，新增中文、粤语、日语、德语等多语种支持，提升多语言交互体验。",
    "link": "https://www.aibase.com/zh/news/29013",
    "tags": ["Claude", "Anthropic", "语音交互", "多语言"]
  },
  {
    "title": "曹操出行全面启动香港Robotaxi业务，发布\"RoboX\"战略与\"Eva Cab\"车型",
    "description": "曹操出行宣布启动香港Robotaxi业务，发布RoboX战略及首款原生自动驾驶出租车Eva Cab，向AI全面转型，致力打造全球领先物理AI移动科技平台。",
    "link": "https://www.aibase.com/zh/news/29012",
    "tags": ["Robotaxi", "自动驾驶", "曹操出行", "AI出行"]
  },
  {
    "title": "Liblib完成近3亿美元B+轮融资，估值超20亿美元ARR破3亿",
    "description": "中国AI应用公司Liblib完成近3亿美元B+轮融资，由Granite Asia、腾讯、顺为资本联合领投，8个月内两轮累计融资超5亿美元，ARR已突破3亿美元。",
    "link": "https://www.aibase.com/zh/news/29008",
    "tags": ["融资", "Liblib", "AI应用", "创投"]
  },
  {
    "title": "谁在使用 Claude Code？最新用户画像：平均每周\"爆肝\"20小时",
    "description": "最新数据显示Claude Code用户平均每周使用20小时，开发者群体成为AI编程工具的深度用户，AI辅助编程正在改变软件开发工作流。",
    "link": "https://www.aibase.com/zh/news/29004",
    "tags": ["Claude Code", "AI编程", "开发者", "工具"]
  },
  {
    "title": "为AI芯片\"续命\"，中国人造钻石等来了大机会",
    "description": "在AI芯片领域，金刚石散热技术已是不二之选。人造钻石材料的导热性能优异，正成为AI芯片散热的关键解决方案，中国产业链迎来新机遇。",
    "link": "https://www.36kr.com/p/3859519082320898",
    "tags": ["AI芯片", "散热技术", "人造钻石", "半导体"]
  },
  {
    "title": "智谱创始人唐杰隔空对话马斯克：赶超Claude Fable 5不用等到2027年",
    "description": "智谱创始人唐杰公开回应马斯克关于中美AI差距的观点，重新校准中美大模型能力的时间差，展现中国大模型企业的自信与实力。",
    "link": "https://www.36kr.com/p/3859419411534850",
    "tags": ["智谱", "大模型", "马斯克", "中美AI"]
  },
  {
    "title": "硅谷最抢手的新岗位出现了",
    "description": "模型神话正式退场，落地战争全面打响。AI行业从技术竞赛转向应用落地，催生了全新的职业需求，AI应用部署与运营人才成为硅谷最热招聘方向。",
    "link": "https://www.36kr.com/p/3859434968185734",
    "tags": ["AI就业", "硅谷", "应用落地", "招聘"]
  },
  {
    "title": "刚刚，诺贝尔奖得主成Anthropic新员工",
    "description": "诺贝尔化学奖得主、AlphaFold核心开发者John Jumper官宣加入Anthropic。博士毕业6个月直接领队AlphaFold，7年后拿下诺奖，如今加入AI安全公司。",
    "link": "https://www.36kr.com/p/3860814933660674",
    "tags": ["Anthropic", "诺贝尔奖", "AlphaFold", "人才"]
  },
  {
    "title": "花钱雇AI当同事，我的生意怎么样了？",
    "description": "每月一两千元就能把数字员工用到起飞。越来越多的中小商家开始雇佣AI数字员工处理日常业务，AI正从概念走向实际生产场景。",
    "link": "https://www.36kr.com/p/3860798447686920",
    "tags": ["AI应用", "数字员工", "商业化", "中小企业"]
  },
  {
    "title": "今天起，Claude Design要把设计师和程序员变成同一种人了",
    "description": "Anthropic推出Claude Design大更新，设计系统一键导入，代码双向同步，9大平台一键导出。AI跑了八轮自查才敢把设计稿给你看。",
    "link": "https://www.36kr.com/p/3858531433780228",
    "tags": ["Claude Design", "Anthropic", "设计工具", "AI"]
  },
  {
    "title": "开发者冲爆了，全球前十AI Lab无限免费，一周烧出3.12万亿Token",
    "description": "全球前十AI Lab推出无限免费计划，一周总调用量达3.12万亿Token，开发者疯狂涌入，引发对AI基础设施规模化成本的讨论。",
    "link": "https://www.36kr.com/p/3858531519288326",
    "tags": ["Token", "AI Lab", "免费", "开发者"]
  },
  {
    "title": "AI 接管交易的最后一步，微信迈出去了",
    "description": "微信开始将AI深度融入交易场景，发挥其得天独厚的社交生态优势。AI正在重塑电商、支付和商业闭环，微信迈出关键一步。",
    "link": "https://www.36kr.com/p/3858355747765127",
    "tags": ["微信", "AI交易", "电商", "腾讯"]
  }
];
