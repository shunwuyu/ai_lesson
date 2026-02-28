import { MilvusClient, DataType, IndexType, MetricType } from '@zilliz/milvus2-sdk-node';

// ================= 配置区域 =================
// 1. 替换为你的云端 URI (在控制台集群详情页找 "Public Endpoint")
const ADDRESS = 'https://in03-73f880f0149c55e.serverless.ali-cn-hangzhou.cloud.zilliz.com.cn'; 

// 2. 替换为你的 API Key (点击右上角 "API 密钥" 复制)
const TOKEN = 'ee677c8daab3a42cbef237144af547ba935be17cdd6b00124e745635f530857ef61047f15d598bf91218ebf42cfaa6ecd4b601c0'; 
// ===========================================

async function main() {
  // 1. 初始化客户端
  const client = new MilvusClient({
    address: ADDRESS,
    token: TOKEN,
    // 如果是自签名证书报错，可以加这一行忽略 SSL 验证 (生产环境建议配置好证书)
    // ssl: true, 
  });

  console.log('✅ 正在连接 Zilliz Cloud...');
  
  // 检查连接是否成功
  const checkHealth = await client.checkHealth();
  if (!checkHealth.isHealthy) {
    console.error('❌ 连接失败:', checkHealth.reasons);
    return;
  }
  console.log('🎉 连接成功！集群状态正常。');

  // --- 以下演示基本操作 ---

  const COLLECTION_NAME = 'test';
  const DIMENSION = 4; // 演示用小维度

  // 2. 创建集合 (如果已存在会报错，实际项目中建议先 hasCollection)
  try {
    await client.createCollection({
      collection_name: COLLECTION_NAME,
      dimension: DIMENSION,
      auto_id: true,         // 让数据库自动生成 ID
    });
    console.log(`📦 集合 '${COLLECTION_NAME}' 创建成功。`);
    // 必须等集合创建完成后才能建索引
    await client.createIndex({
      collection_name: COLLECTION_NAME,
      field_name: 'vector', // 向量字段名，默认就是 'vector'
      index_type: IndexType.AUTOINDEX, // 推荐使用 AUTOINDEX，云端会自动优化
      metric_type: MetricType.COSINE,  // <--- 距离度量方式写在这里
    });
    console.log('🔖 索引创建成功 (Metric: COSINE)');
  } catch (e) {
    console.log(`⚠️ 集合可能已存在或创建出错: ${e.message}`);
  }

  

  // 3. 插入数据
  // const data = [
  //   { vector: [0.1, 0.2, 0.3, 0.4], content: '这是第一条数据' },
  //   { vector: [0.5, 0.6, 0.7, 0.8], content: '这是第二条数据' },
  // ];
  
  // const insertRes = await client.insert({
  //   collection_name: COLLECTION_NAME,
  //   data: data,
  // });
  // console.log(`💾 插入成功，ID: ${insertRes.IDs}`);
  // return 
  // 4. 向量搜索
  const searchRes = await client.search({
    collection_name: COLLECTION_NAME,
    data: [[0.1, 0.2, 0.3, 0.4]], // 搜索向量
    limit: 1,                      // 返回前 2 个结果
    output_fields: ['content'],    // 返回额外字段
  });

  console.log('🔍 搜索结果:', JSON.stringify(searchRes.results, null, 2));
}

main().catch(console.error);