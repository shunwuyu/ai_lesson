import "dotenv/config";
import { MilvusClient, MetricType } from'@zilliz/milvus2-sdk-node';
import { OpenAIEmbeddings } from"@langchain/openai";

// ================= 配置区域 =================
// 1. 替换为你的云端 URI (在控制台集群详情页找 "Public Endpoint")
const ADDRESS = 'https://in03-73f880f0149c55e.serverless.ali-cn-hangzhou.cloud.zilliz.com.cn'; 

// 2. 替换为你的 API Key (点击右上角 "API 密钥" 复制)
const TOKEN = 'ee677c8daab3a42cbef237144af547ba935be17cdd6b00124e745635f530857ef61047f15d598bf91218ebf42cfaa6ecd4b601c0'; 
// ===========================================


const COLLECTION_NAME = 'ebook';
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

async function getEmbedding(text) {
const result = await embeddings.embedQuery(text);
return result;
}

async function main() {
try {
    console.log('Connecting to Milvus...');
    await client.connectPromise;
    console.log('✓ Connected\n');

    // 确保集合已加载
    try {
      await client.loadCollection({ collection_name: COLLECTION_NAME });
      console.log('✓ 集合已加载\n');
    } catch (error) {
      // 如果已经加载，会报错，忽略即可
      if (!error.message.includes('already loaded')) {
        throw error;
      }
      console.log('✓ 集合已处于加载状态\n');
    }

    // 向量搜索
    console.log('Searching for similar ebook content...');
    const query = '段誉会什么武功？';
    console.log(`Query: "${query}"\n`);

    const queryVector = await getEmbedding(query);
    const searchResult = await client.search({
      collection_name: COLLECTION_NAME,
      vector: queryVector,
      limit: 3,
      metric_type: MetricType.COSINE,
      output_fields: ['id', 'book_id', 'chapter_num', 'index', 'content']
    });

    console.log(`Found ${searchResult.results.length} results:\n`);
    searchResult.results.forEach((item, index) => {
      console.log(`${index + 1}. [Score: ${item.score.toFixed(4)}]`);
      console.log(`   ID: ${item.id}`);
      console.log(`   Book ID: ${item.book_id}`);
      console.log(`   Chapter: 第 ${item.chapter_num} 章`);
      console.log(`   Index: ${item.index}`);
      console.log(`   Content: ${item.content}\n`);
    });

  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();