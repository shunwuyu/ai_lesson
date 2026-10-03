import Redis from 'ioredis';

// 创建 Redis 客户端
// Redis 默认内置 16 个逻辑库，编号 0‑15，**db:0 就是选用第 0 号数据库**，用来隔离不同业务数据。
const redis = new Redis({
  host: 'localhost',
  port: 6380,
  db: 0
});

// 监听连接
redis.on('connect', () => {
  console.log('✅ ioredis 连接成功（mjs 版）');
});

// 错误监听
redis.on('error', (err) => {
  console.error('❌ Redis 连接失败：', err);
});

// 执行操作
async function runRedisDemo() {
  try {
    // =========================
    // 1. String 字符串
    // =========================
    await redis.set('name', '张三');
    await redis.set('code', '6666', 'EX', 300); // 5 分钟过期
    console.log('String name:', await redis.get('name'));

    // =========================
    // 2. Hash 哈希
    // =========================
    await redis.hset('user:1001', 'name', '李四', 'age', 28);
    console.log('Hash user:', await redis.hgetall('user:1001'));

    // =========================
    // 3. List 列表
    // =========================
    await redis.lpush('task:list', '任务1', '任务2');
    await redis.rpush('task:list', '任务3');
    console.log('List:', await redis.lrange('task:list', 0, -1));

    // =========================
    // 4. Set 集合
    // =========================
    await redis.sadd('tag:set', 'redis', 'nest', 'node');
    console.log('Set:', await redis.smembers('tag:set'));

    // =========================
    // 5. ZSet 有序集合
    // =========================
    await redis.zadd('score:rank', 99, '小明', 95, '小红');
    console.log('ZSet 排名:', await redis.zrange('score:rank', 0, -1));

    // =========================
    // 6. 分布式锁（标准写法）
    // =========================
    const lockKey = 'lock:order:1001';
    const lockResult = await redis.set(lockKey, 'locked', 'NX', 'EX', 10);
    console.log('分布式锁:', lockResult ? '加锁成功' : '加锁失败');

  } catch (err) {
    console.error('执行异常：', err);
  }
}

// 运行
runRedisDemo();
