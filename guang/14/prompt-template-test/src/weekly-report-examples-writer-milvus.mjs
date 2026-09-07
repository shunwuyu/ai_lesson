import 'dotenv/config';
import { MilvusClient, DataType, MetricType, IndexType } from '@zilliz/milvus2-sdk-node';
import { OpenAIEmbeddings } from '@langchain/openai';

const COLLECTION_NAME = 'weekly_report_examples';
const VECTOR_DIM = 1024;

const EXAMPLES = [
  {
    scenario:
      '支付系统稳定性治理，强调风险防控、告警收敛和应急预案完善。',
    report_snippet:
      `- 本周聚焦支付链路稳定性，共处理 P1 事故 1 起、P2 事故 2 起，均在 SLA 内完成修复；\n` +
      `- 针对历史高频超时问题，完成 3 个关键接口的超时阈值和重试策略优化；\n` +
      `- 优化告警策略，合并冗余告警 10 条，新增 5 条基于 SLO 的告警规则。`,
  },
  {
    scenario:
      '新功能首发，更多是对外展示亮点，如新看板、新能力上线，适合发给大量跨部门同学。',
    report_snippet:
      `- 上线「运营实时看板」，支持业务实时查看核心转化漏斗；\n` +
      `- 打通埋点 → DWD → 实时服务链路，为后续精细化运营提供基础；\n` +
      `- 组织 2 场跨部门分享，帮助非技术同学理解新能力的业务价值。`,
  },
  {
    scenario:
      '重大版本发布节奏紧凑，需要对外同步一揽子新能力，强调可视化展示和业务价值。',
    report_snippet:
      `- 正式发布「增长分析 2.0」版本，新增留存分群、活动追踪等 5 项核心能力；\n` +
      `- 与市场同学联合输出发布解读文档，并在周会中向核心干系人进行路演；\n` +
      `- 配合运营梳理了 3 条重点推广场景，推动更多业务线接入新能力。`,
  },
  {
    scenario:
      '偏向产品体验优化和灰度试点，虽然不是大规模首发，但需要让老板看到长期产品线升级方向。',
    report_snippet:
      `- 针对「自助配置」后台完成一轮体验优化，减少 3 个关键操作步骤，提升整体可用性；\n` +
      `- 在小流量场景下灰度上线「智能推荐」能力，观察首周转化率提升约 3 个百分点；\n` +
      `- 拉通产品、运营和数据同学，对后续两个月的产品升级路线图达成一致。`,
  },
  {
    scenario:
      '技术债清理为主，核心工作是重构、单测补齐、文档完善，节奏偏稳，不强调对外大新闻。',
    report_snippet:
      `- 对老旧结算模块进行分层重构，拆出 3 个独立子模块，代码结构更加清晰；\n` +
      `- 补齐 25 条关键路径单元测试用例，整体覆盖率从 55% 提升到 68%；\n` +
      `- 完成 2 份系统设计文档补全，方便后续同学接手维护。`,
  },
  {
    scenario:
      '以老系统拆分和代码瘦身为主，更多是内部质量提升，重点在于风险可控和长期维护成本下降。',
    report_snippet:
      `- 拆分历史「大单体」服务中的账务子模块，沉淀为独立结算服务，减少跨模块耦合；\n` +
      `- 清理 30+ 条废弃接口和配置项，并在网关层加保护，降低后续演进阻力；\n` +
      `- 对关键重构路径补充回滚预案和演练手册，保证发布过程可控。`,
  },
  {
    scenario:
      '聚焦测试补齐和监控完善，希望通过一轮技术债治理把「隐性风险」暴露并关掉。',
    report_snippet:
      `- 新增 40+ 条端到端回归用例，覆盖主交易链路和高风险边界场景；\n` +
      `- 完成核心链路埋点和监控指标补齐，为后续 SLO 建设打下基础；\n` +
      `- 针对本周发现的 3 个潜在性能瓶颈，拉齐改造方案并排入后续技术债清单。`,
  },
  {
    scenario:
      '偏向团队协作和流程优化，比如值班轮值、需求评审机制、跨团队沟通等软性建设。',
    report_snippet:
      `- 完成新一轮值班排班和值班手册更新，降低新同学值班心理压力；\n` +
      `- 优化需求评审流程，引入「技术风险清单」模板，帮助更早发现潜在问题；\n` +
      `- 与运维、产品同学一起梳理了故障复盘模板，后续复盘将更聚焦于可执行改进项。`,
  },
];

const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
  model: process.env.EMBEDDINGS_MODEL_NAME,
  configuration: {
    baseURL: process.env.OPENAI_BASE_URL,
  },
  dimensions: VECTOR_DIM,
});

// 初始化 Milvus 客户端
const client = new MilvusClient({
  address: 'localhost:19530',
});

/**
 * 获取文本的向量嵌入
 */
async function getEmbedding(text) {
  const result = await embeddings.embedQuery(text);
  return result;
}

/**
 * 创建或获取集合
 */
async function ensureCollection() {
  try {
    // 检查集合是否存在
    const hasCollection = await client.hasCollection({
      collection_name: COLLECTION_NAME,
    });

    if (!hasCollection.value) {
      console.log('创建集合...');
      await client.createCollection({
        collection_name: COLLECTION_NAME,
        fields: [
          {
            name: 'id',
            data_type: DataType.VarChar,
            max_length: 100,
            is_primary_key: true,
          },
          {
            name: 'scenario',
            data_type: DataType.VarChar,
            max_length: 2000,
          },
          {
            name: 'report_snippet',
            data_type: DataType.VarChar,
            max_length: 10000,
          },
          {
            name: 'vector',
            data_type: DataType.FloatVector,
            dim: VECTOR_DIM,
          },
        ],
      });
      console.log('✓ 集合创建成功');

      // 创建索引
      console.log('创建索引...');
      await client.createIndex({
        collection_name: COLLECTION_NAME,
        field_name: 'vector',
        index_type: IndexType.IVF_FLAT,
        metric_type: MetricType.COSINE,
        params: { nlist: 1024 },
      });
      console.log('✓ 索引创建成功');
    }

    // 确保集合已加载
    try {
      await client.loadCollection({ collection_name: COLLECTION_NAME });
      console.log('✓ 集合已加载');
    } catch (error) {
      console.log('✓ 集合已处于加载状态');
    }
  } catch (error) {
    console.error('创建集合时出错:', error.message);
    throw error;
  }
}

/**
 * 将周报示例插入到 Milvus
 */
async function insertExamples() {
  try {
    if (EXAMPLES.length === 0) {
      return 0;
    }

    console.log(`\n开始生成向量并插入 ${EXAMPLES.length} 条周报示例...`);

    const insertData = await Promise.all(
      EXAMPLES.map(async (example, index) => {
        // 这里用 scenario + report_snippet 作为向量文本
        const vector = await getEmbedding(example.scenario + example.report_snippet);
        return {
          id: `weekly_${index + 1}`,
          scenario: example.scenario,
          report_snippet: example.report_snippet,
          vector,
        };
      })
    );

    const insertResult = await client.insert({
      collection_name: COLLECTION_NAME,
      data: insertData,
    });

    const insertedCount = Number(insertResult.insert_cnt) || 0;
    console.log(`✓ 已插入 ${insertedCount} 条记录`);
    return insertedCount;
  } catch (error) {
    console.error('插入周报示例时出错:', error.message);
    console.error('错误详情:', error);
    throw error;
  }
}

/**
 * 主函数
 */
async function main() {
  try {
    console.log('='.repeat(80));
    console.log('周报示例写入 Milvus');
    console.log('='.repeat(80));

    // 连接 Milvus
    console.log('\n连接 Milvus...');
    await client.connectPromise;
    console.log('✓ 已连接\n');

    // 确保集合存在
    await ensureCollection();

    // 插入示例数据
    await insertExamples();

    console.log('='.repeat(80));
    console.log('写入完成！');
    console.log('='.repeat(80));
  } catch (error) {
    console.error('\n错误:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();

