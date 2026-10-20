import { connect } from '../config.mjs';

const EXCHANGE = 'doc.route.headers';

/**
 * ========== headers 交换机 ==========
 *
 * 行为：不看 routing key，而是看消息的 headers（一组键值对）是否满足绑定条件。
 *
 * 何时用 headers 而不是 topic/direct：
 *   - 路由条件是多个独立属性（格式、优先级、租户、语言…），很难压成一条 routing key
 *   - 需要「同时满足多个条件」或「满足任一条件」这类组合逻辑
 *
 * 匹配模式由绑定参数 x-match 决定（见 consumer）：
 *   - all：绑定里列出的 header 必须全部匹配
 *   - any：绑定里任一 header 匹配即可
 */
async function main() {
  const { connection, channel } = await connect();

  await channel.assertExchange(EXCHANGE, 'headers', { durable: true });

  const messages = [
    {
      headers: { format: 'pdf', priority: 'high' },
      body: { docId: '1', note: '高优先级 PDF' },
    },
    {
      headers: { format: 'pdf', priority: 'low' },
      body: { docId: '2', note: '低优先级 PDF' },
    },
    {
      headers: { format: 'docx', priority: 'high' },
      body: { docId: '3', note: '高优先级 DOCX' },
    },
  ];

  for (const item of messages) {
    /**
     * headers 交换机下 routing key 通常传 ''（会被忽略）。
     * 真正参与路由的是 options.headers。
     */
    channel.publish(EXCHANGE, '', Buffer.from(JSON.stringify(item.body)), {
      persistent: true,
      contentType: 'application/json',
      headers: item.headers,
    });
    console.log('[headers producer] 发送 headers=', item.headers, 'body=', item.body);
  }

  setTimeout(async () => {
    await channel.close();
    await connection.close();
  }, 500);
}

main().catch(console.error);
