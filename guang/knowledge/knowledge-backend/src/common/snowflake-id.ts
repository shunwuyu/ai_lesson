// 引入雪花 ID 生成器
// 基于时间戳、机器 ID 和自增序列号拼接生成全局大致有序的字符串型 64 位分布式 ID。
import SnowflakeId from 'snowflake-id';

const snowflake = new SnowflakeId({
  mid: Number(process.env.SNOWFLAKE_WORKER_ID ?? 1),
  offset: Number(process.env.SNOWFLAKE_OFFSET ?? 1704067200000),
});

/** 生成雪花 ID（string），对应 Postgres BIGINT */
export function nextSnowflakeId(): string {
  return snowflake.generate();
}