import { connect } from '../config.mjs';

const EXCHANGE = 'doc.parse.fanout';
/** 本消费者专属队列：只负责「全文检索写入 ElasticSearch」 */
const QUEUE = 'doc.elasticsearch';

/**
 * fanout 消费者 B：模拟写入 ElasticSearch。
 *
 * 与 consumer-vector.js 绑定同一 Exchange、不同 Queue。
 * 生产者只发一次；两个队列各收一份，天然实现「一份 Markdown → 两路异步落地」。
 */
async function main() {
  const { channel } = await connect();

  await channel.assertExchange(EXCHANGE, 'fanout', { durable: true });
  await channel.assertQueue(QUEUE, { durable: true });

  // 同样绑定到 fanout；routing key 仍可传空
  await channel.bindQueue(QUEUE, EXCHANGE, '');

  console.log(`[fanout] ES 消费者监听队列: ${QUEUE}`);

  channel.consume(QUEUE, (msg) => {
    if (!msg) return;

    const data = JSON.parse(msg.content.toString());
    console.log('[es] 收到消息，写入 ElasticSearch:', data.docId, data.source);

    // 实际项目里这里会做：解析 Markdown → 建索引文档 → bulk 写入 ES
    channel.ack(msg); // 手动确认消息已处理
  });
}

main().catch(console.error);
