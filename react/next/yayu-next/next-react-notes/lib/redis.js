// 引入 ioredis，一个 Node.js 的全功能 Redis 客户端，支持 Promise/async-await
import Redis from 'ioredis'

// 创建 Redis 实例，默认连接 localhost:6379
const redis = new Redis()

// 预设的初始笔记数据，用作数据库默认种子
const initialData = {
  // key 是时间戳生成的唯一 ID（uuid），value 是 JSON 字符串存储标题、内容、更新时间
  "1702459181837": '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459182837": '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459188837": '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}'
}
// 没有"表"的概念 ：Redis 是 key-value 存储，代码里用的是 Hash 数据类型 （ hset / hget ），
// 不需要提前建表或声明字段
// - 自动创建 ：第一次 hset("notes", ...) 时，"notes" 这个 Hash 还不存在，Redis 会自动创建它

// 获取所有笔记，返回 { uuid: JSON字符串 } 的对象
export async function getAllNotes() {
  // hgetall：获取 Redis Hash "notes" 里所有的 field → value 映射
  const data = await redis.hgetall("notes");
  // 首次使用时数据库为空，则写入预设的种子数据
  if (Object.keys(data).length == 0) {
    // hset：批量设置 Hash 字段
    await redis.hset("notes", initialData);
  }
  // 再次查询，返回与数据库中一致的最新数据
  return await redis.hgetall("notes")
}

// 新增笔记，data 是 JSON 字符串（含 title、content、updateTime）
export async function addNote(data) {
  // 用当前时间戳作为唯一 ID
  const uuid = Date.now().toString();
  // hset 存入 Redis Hash，field 是 uuid，value 是笔记 JSON
  // 在 notes 这张 Hash 里，以 uuid 为 key 存入笔记数据。用数组 [uuid] 是 ioredis 的接口设计，
  await redis.hset("notes", [uuid], data);
  return uuid
}

// 更新已有笔记，uuid 指定记录，data 是覆盖后的新 JSON 字符串
export async function updateNote(uuid, data) {
  // hset 对已有 field 直接覆盖，所以更新本质就是一次 hset
  await redis.hset("notes", [uuid], data);
}

// 根据 uuid 获取单条笔记内容
export async function getNote(uuid) {
  // hget：从 Hash 中取某个 field 的值
  const raw = await redis.hget("notes", uuid);
  // Redis 存的是 JSON 字符串，需 parse 还原成 JS 对象返回
  return JSON.parse(raw);
}

// 删除指定 uuid 对应的笔记
export async function delNote(uuid) {
  // hdel：删除 Hash 中指定 field，返回 0 或 1 表示删了几条
  return redis.hdel("notes", uuid)
}

// 默认导出 redis 实例，供其他模块直接使用
export default redis
