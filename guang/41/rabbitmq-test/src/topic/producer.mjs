import { connect } from '../config.mjs';

const EXCHANGE = 'doc.event.topic';

/**
 * ========== topic 交换机 ==========
 *
 * 行为：routing key 按「.」分成若干单词，绑定端可用通配符做模式匹配。
 *
 * 通配符规则：
 *   *  → 恰好匹配一个单词（不能跨段）
 *   #  → 匹配零个或多个单词（可跨段）
 *
 * 示例 routing key：
 *   doc.pdf.parsed
 *   │   │    └── 事件类型
 *   │   └─────── 文档格式
 *   └─────────── 业务域
 *
 * 对比 direct：
 *   - direct：必须整串完全相等
 *   - topic：可以用模式一次订阅一类消息（如所有 *.parsed）
 */
async function main() {
  const { connection, channel } = await connect();

  await channel.assertExchange(EXCHANGE, 'topic', { durable: true });

  const events = [
    { routingKey: 'doc.pdf.parsed', body: { type: 'parsed', format: 'pdf' } },
    { routingKey: 'doc.docx.parsed', body: { type: 'parsed', format: 'docx' } },
    { routingKey: 'doc.pptx.failed', body: { type: 'failed', format: 'pptx' } },
    { routingKey: 'doc.pdf.failed', body: { type: 'failed', format: 'pdf' } },
  ];

  for (const event of events) {
    /**
     * 发布时写「具体」的 routing key（一般不用通配符）。
     * 通配符是给消费者 bindQueue 时用的。
     */
    channel.publish(
      EXCHANGE,
      event.routingKey,
      Buffer.from(JSON.stringify(event.body)),
      { persistent: true, contentType: 'application/json' },
    );
    console.log(`[topic producer] 发送 routingKey=${event.routingKey}:`, event.body);
  }

  setTimeout(async () => {
    await channel.close();
    await connection.close();
  }, 500);
}

main().catch(console.error);
