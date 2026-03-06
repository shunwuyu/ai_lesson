import "dotenv/config";
import { MilvusClient, DataType, MetricType, IndexType } from '@zilliz/milvus2-sdk-node';
import { OpenAIEmbeddings } from "@langchain/openai";

// ================= 配置区域 =================
// 1. 替换为你的云端 URI (在控制台集群详情页找 "Public Endpoint")
const ADDRESS = process.env.MILVUS_ADDRESS; 

// 2. 替换为你的 API Key (点击右上角 "API 密钥" 复制)
const TOKEN = process.env.MILVUS_TOKEN; 
// ===========================================


const COLLECTION_NAME = 'ai_diary';
const VECTOR_DIM = 1024;

const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.EMBEDDINGS_MODEL_NAME,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL
    },
    dimensions: VECTOR_DIM
});

const client = new MilvusClient({
    address: ADDRESS,
    token: TOKEN,
    // 如果是自签名证书报错，可以加这一行忽略 SSL 验证 (生产环境建议配置好证书)
    // ssl: true, 
});

async function getEmbedding(text) {
      const result = await embeddings.embedQuery(text);
      return result;
}

async function main() {
    console.log('✅ 正在连接 Zilliz Cloud...');
  
    // 检查连接是否成功
    const checkHealth = await client.checkHealth();
    if (!checkHealth.isHealthy) {
        console.error('❌ 连接失败:', checkHealth.reasons);
        return;
    }
    console.log('🎉 连接成功！集群状态正常。');

    await client.createCollection({
        collection_name: COLLECTION_NAME,
        fields: [
            { name: 'id', data_type: DataType.VarChar, max_length: 50, is_primary_key: true },
            { name: 'vector', data_type: DataType.FloatVector, dim: VECTOR_DIM },
            { name: 'content', data_type: DataType.VarChar, max_length: 5000 },
            { name: 'date', data_type: DataType.VarChar, max_length: 50 },
            { name: 'mood', data_type: DataType.VarChar, max_length: 50},
            { name: 'tags', data_type: DataType.Array, element_type: DataType.VarChar, max_capacity: 10, max_length: 50 }
        ]
    });
    // console.log('Collection created');
    // 创建索引
    // console.log('\nCreating index...');
    await client.createIndex({
        collection_name: COLLECTION_NAME,
        field_name: 'vector',
        index_type: IndexType.IVF_FLAT, // 推荐使用 AUTOINDEX，智能选择最合适的索引类型 为了加速查询
        metric_type: MetricType.COSINE,
        params: { nlist: 1024 } // 
    });
    // console.log('Index created');
    console.log('\nLoading collection...');
    await client.loadCollection({ collection_name: COLLECTION_NAME });
    console.log('Collection loaded');
    // 插入日记数据
    console.log('\nInserting diary entries...');
    const diaryContents = [
              {
                id: 'diary_001',
                content: '今天天气很好，去公园散步了，心情愉快。看到了很多花开了，春天真美好。',
                date: '2026-01-10',
                mood: 'happy',
                tags: ['生活', '散步']
              },
              {
                id: 'diary_002',
                content: '今天工作很忙，完成了一个重要的项目里程碑。团队合作很愉快，感觉很有成就感。',
                date: '2026-01-11',
                mood: 'excited',
                tags: ['工作', '成就']
              },
              {
                id: 'diary_003',
                content: '周末和朋友去爬山，天气很好，心情也很放松。享受大自然的感觉真好。',
                date: '2026-01-12',
                mood: 'relaxed',
                tags: ['户外', '朋友']
              },
              {
                id: 'diary_004',
                content: '今天学习了 Milvus 向量数据库，感觉很有意思。向量搜索技术真的很强大。',
                date: '2026-01-12',
                mood: 'curious',
                tags: ['学习', '技术']
              },
              {
                id: 'diary_005',
                content: '晚上做了一顿丰盛的晚餐，尝试了新菜谱。家人都说很好吃，很有成就感。',
                date: '2026-01-13',
                mood: 'proud',
                tags: ['美食', '家庭']
              }
            ];

        console.log('Generating embeddings...');
        const diaryData = await Promise.all(
                  diaryContents.map(async (diary) => ({
                    ...diary,
                    vector: await getEmbedding(diary.content)
                  }))
                );
            
                const insertResult = await client.insert({
                  collection_name: COLLECTION_NAME,
                  data: diaryData
                });
                console.log(`✓ Inserted ${insertResult.insert_cnt} records\n`);
}

main();