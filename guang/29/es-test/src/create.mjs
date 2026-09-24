import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://localhost:9200'
});

const INDEX_NAME = 'travel_journal';

async function createIndex() {
  const exists = await client.indices.exists({ index: INDEX_NAME });
  if (exists) {
    console.log(`ℹ️ 索引已存在: ${INDEX_NAME}`);
    return;
  }

  await client.indices.create({
    index: INDEX_NAME,
    mappings: {
      properties: {
        note_title: { type: 'text', analyzer: 'ik_max_word', search_analyzer: 'ik_smart' },
        note_body: { type: 'text', analyzer: 'ik_max_word', search_analyzer: 'ik_smart' },
        tags: { type: 'keyword' },
        mood: { type: 'keyword' },
        priority: { type: 'integer' },
        created_at: { type: 'date' },
        updated_at: { type: 'date' }
      }
    }
  });

  console.log(`✅ 索引创建成功: ${INDEX_NAME}`);
}

async function seedData() {
  // 获取当前时间，转为**ISO 标准 UTC 字符串**，格式类似`2026-09-12T06:xx:xx.xxxZ`
  const now = new Date().toISOString();  
  const docs = [
    {
      note_title: '杭州西湖半日游',
      note_body: '早上绕湖慢跑，中午吃片儿川，下午在断桥拍照放松。',
      tags: ['旅行', '周末', '杭州'],
      mood: 'relaxed',
      priority: 2,
      created_at: now,
      updated_at: now
    },
    {
      note_title: '城市骑行计划',
      note_body: '周六沿江骑行 20 公里，带上水和简易修车工具。',
      tags: ['运动', '骑行'],
      mood: 'energetic',
      priority: 3,
      created_at: now,
      updated_at: now
    },
    {
      note_title: '雨天宅家阅读',
      note_body: '下雨天在家看书，整理本周笔记并做晚餐。',
      tags: ['生活', '阅读'],
      mood: 'calm',
      priority: 1,
      created_at: now,
      updated_at: now
    }
  ];
  // `flatMap`先遍历数组每个元素，对每个 doc 返回`[{index...}, doc]`子数组。
  // 普通 map 会得到二维数组`[[obj1,doc1],[obj2,doc2]]`；
  // flatMap 会自动把内层数组拍平，输出一维数组，正好适配 ES bulk 交替「元数据 + 文档」的格式。
  // ES bulk 批量写入的格式
  const operations = docs.flatMap((doc) => [{ index: { _index: INDEX_NAME } }, doc]);
  console.log(operations);
  // 批量操作 API
  // 批量增写
  // refresh:true 写完立刻刷新可查询
  await client.bulk({ refresh: true, operations });
  console.log(`✅ 初始化数据完成，共 ${docs.length} 条`);
}

async function run() {
  await createIndex();
  await seedData();
}

run().catch((err) => {
  console.error('❌ 创建阶段失败:', err);
  // 直接终止当前程序，**返回码 1 代表程序异常退出**
  process.exit(1);
});
