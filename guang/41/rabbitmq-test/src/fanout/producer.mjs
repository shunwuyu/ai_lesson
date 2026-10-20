import { connect } from '../config.mjs';

/** 交换机名称。Producer 只往 Exchange 发消息，从不直接写某个 Queue。 */
const EXCHANGE = 'doc.parse.fanout';

/**
 * ========== fanout 交换机 ==========
 *
 * 行为：把消息广播到所有绑定了该交换机的 Queue，完全忽略 routing key。
 *
 * 典型场景（RAG）：
 *   文档解析完成后得到 Markdown → 发一条消息到 fanout
 *   → 向量化消费者、ES 消费者各自绑定自己的队列，都能收到同一份消息副本
 *   → 两边异步并行处理，解析接口不必同步等待
 */
async function main() {
  const { connection, channel } = await connect();

  /**
   * assertExchange：交换机不存在则创建，已存在则校验类型是否一致。
   * - type: 'fanout' 广播模式
   * - durable: true  Brokers 重启后交换机定义仍保留（消息是否持久另看消息属性）
   */
  await channel.assertExchange(EXCHANGE, 'fanout', { durable: true });

  // 模拟「解析接口」产出的业务载荷
  const message = {
    docId: `doc-${Date.now()}`,
    markdown: '# Hello RAG\n\n这是解析后的 Markdown 内容。',
    source: 'report.pdf',
  };

  /**
   * publish(exchange, routingKey, content, options)
   *
   * fanout 下第二个参数 routingKey 会被忽略，习惯上传 ''。
   * persistent: true  标记消息为持久化，配合 durable 队列，Broker 重启后尽量不丢
   *                   （严格不丢还要配合镜像/仲裁队列、发布确认等，这里先演示基本用法）
   */
  channel.publish(EXCHANGE, '', Buffer.from(JSON.stringify(message)), {
    persistent: true,
    contentType: 'application/json',
  });

  console.log('[fanout producer] 已发送:', message);

  // 给底层缓冲一点时间把消息刷出去，再关连接（演示脚本写法）
  setTimeout(async () => {
    await channel.close();
    await connection.close();
  }, 500);
}

main().catch(console.error);
