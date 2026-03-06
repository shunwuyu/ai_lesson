import "dotenv/config";
import { MilvusClient } from '@zilliz/milvus2-sdk-node';
import { OpenAIEmbeddings } from "@langchain/openai";

const COLLECTION_NAME = 'ai_diary';
const VECTOR_DIM = 1024;

// ================= 配置区域 =================
// 1. 替换为你的云端 URI (在控制台集群详情页找 "Public Endpoint")
const ADDRESS = process.env.MILVUS_ADDRESS; 

// 2. 替换为你的 API Key (点击右上角 "API 密钥" 复制)
const TOKEN = process.env.MILVUS_TOKEN; 

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

// async function main() {
//   try {
//     console.log('Connecting to Milvus...');
//     // await client.connectPromise;
//     // console.log('✓ Connected\n');

//     // 更新数据（Milvus 通过 upsert 实现更新）
//     console.log('Updating diary entry...');
//     const updateId = 'diary_001';
//     const updatedContent = {
//       id: updateId,
//       content: '今天下了一整天的雨，心情很糟糕。工作上遇到了很多困难，感觉压力很大。一个人在家，感觉特别孤独。',
//       date: '2026-01-10',
//       mood: 'sad',
//       tags: ['生活', '散步', '朋友']
//     };

//     console.log('Generating new embedding...');
//     const vector = await getEmbedding(updatedContent.content);
//     const updateData = { ...updatedContent, vector };

//     const result = await client.upsert({
//       collection_name: COLLECTION_NAME,
//       data: [updateData]
//     });

//     console.log(`✓ Updated diary entry: ${updateId}`);
//     console.log(`  New content: ${updatedContent.content}`);
//     console.log(`  New mood: ${updatedContent.mood}`);
//     console.log(`  New tags: ${updatedContent.tags.join(', ')}\n`);

//   } catch (error) {
//     console.error('Error:', error.message);
//   }
// }

async function main() {
     try {
            console.log('Connecting to Milvus...');
        
            // 删除单条数据
            console.log('Deleting diary entry...');
            const deleteId = 'diary_005';
        
            const result = await client.delete({
              collection_name: COLLECTION_NAME,
              filter: `id == "${deleteId}"`
            });
        
            console.log(`✓ Deleted ${result.delete_cnt} record(s)`);
            console.log(`  ID: ${deleteId}\n`);
        
            // 批量删除
            console.log('Batch deleting diary entries...');
            const deleteIds = ['diary_002', 'diary_003'];
            const idsStr = deleteIds.map(id => `"${id}"`).join(', ');
        
            const batchResult = await client.delete({
              collection_name: COLLECTION_NAME,
              filter: `id in [${idsStr}]`
            });
        
            console.log(`✓ Batch deleted ${batchResult.delete_cnt} record(s)`);
            console.log(`  IDs: ${deleteIds.join(', ')}\n`);
        
            // 条件删除
            console.log('Deleting by condition...');
            const conditionResult = await client.delete({
              collection_name: COLLECTION_NAME,
              filter: `mood == "sad"`
            });
        
            console.log(`✓ Deleted ${conditionResult.delete_cnt} record(s) with mood="sad"\n`);
        
          } catch (error) {
            console.error('Error:', error.message);
          }
}

main();