import { 
  // Milvus 客户端, 链接数据库
  MilvusClient, 
  //  索引类型
  // Milvus存的是高维向量，
  // 没有索引时，每次查询都要把库里的向量和查询向量逐一算相似度，这就是"  
  // 力搜索"，数据量大了慢得没法用。
  IndexType,
  // 你想在图书馆找一本"和《三体》最像的书"。没有索引 = 把馆里100万本书每本翻一遍对比，累死。  
  // 有索引 = 图书管理员提前把所有书按主题、风格分好类，贴好标签。你一说"科幻、硬核、宇宙尺度"，直接定位到对应
  // 的几个书架，翻几十本就够了。
  // IVF\_FLAT  索引
  // Inverted File 倒排文件 FLAT：簇内不做向量压缩，保存原始向量
  // 所有书籍（向量）先按题材分成若干书架 
  // 图书馆馆长先用 K-Means 算法，给每个书架定一个**样板书**
  // 新书进来，对比所有样板书，放到内容最接近的那个书架。
  // 找书时只翻看最相关的几个书架，不用查全部，速度快

  // 度量类型枚举
  // 相似度计算规则
  // L2 欧氏距离 数值差距越小越相似。 适合图像特征
  // COSINE（余弦相似度） 只看方向，不受向量长度影响
  MetricType 
} from '@zilliz/milvus2-sdk-node';
import 'dotenv/config';

// ================= 配置区域 =================
// 1. 替换为你的云端 URI (在控制台集群详情页找 "Public Endpoint")
const ADDRESS = process.env.MILVUS_ADDRESS; 

// 2. 替换为你的 API Key (点击右上角 "API 密钥" 复制)
const TOKEN = process.env.MILVUS_TOKEN; 
// ===========================================

async function main() {
  // 1. 初始化客户端
  const client = new MilvusClient({
    address: ADDRESS,
    token: TOKEN,
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

  // // 2. 创建集合 (如果已存在会报错，实际项目中建议先 hasCollection)
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
      index_type: IndexType.AUTOINDEX, // 推荐使用 AUTOINDEX，智能选择最合适的索引类型 为了加速查询
      metric_type: MetricType.COSINE,  // <--- 距离度量方式写在这里吗 metric 距离函数
    });
    console.log('🔖 索引创建成功 (Metric: COSINE)');
  } catch (e) {
    console.log(`⚠️ 集合可能已存在或创建出错: ${e.message}`);
  }

  

  // // 3. 插入数据
  const data = [
    { vector: [0.1, 0.2, 0.3, 0.4], content: '这是第一条数据' },
    { vector: [0.5, 0.6, 0.7, 0.8], content: '这是第二条数据' },
  ];
  
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
  // return 
  const searchRes2 = await client.search({
    collection_name: COLLECTION_NAME,
    data: [[0.5, 0.5, 0.6, 0.8]], // 搜索向量
    limit: 1,                      // 返回前 2 个结果
    output_fields: ['content'],    // 返回额外字段
  });

  console.log('🔍 搜索结果:', JSON.stringify(searchRes2.results, null, 2));
}

main().catch(console.error);