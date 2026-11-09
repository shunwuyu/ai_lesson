// 雪花 ID 转换器
// postgres 的 BIGINT 太大，超出 JS 安全数字范围，直接读会精度丢失。
// 这个转换器查出来自动转字符串，存的时候不动，保证雪花 ID 不变。
// 花 ID 就是一个很长的数字 ID， 
// 它里面拼了时间戳、机器编号、序列号，同一台机器同一毫秒里，序列号才自增，设计上保证全局唯一
import { ValueTransformer } from 'typeorm';

/**
 * Postgres BIGINT ↔ JS string
 * 雪花 ID 超过 Number 安全整数范围，必须用字符串，否则会丢精度。
 */
export const bigintTransformer: ValueTransformer = {
  to: (v) => v, // 写入：原样交给驱动
  from: (v) => (v == null ? v : String(v)), // 读出：统一转成 string
};