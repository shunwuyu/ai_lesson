import { connect } from '../config.mjs';

const EXCHANGE = 'doc.parse.fanout';
/** 本消费者专属队列：只负责「分片 + 写入向量库」 */
const QUEUE = 'doc.vectorize';

/**
 * fanout 消费者 A：模拟向量化写入 Milvus。
 *
 * 要点：
 *   - 每个处理环节用自己的 Queue，再 bind 到同一个 fanout Exchange
 *   - Exchange 广播时，每条消息都会「复制」进每个绑定队列
 *   - 所以 vector 队列和 es 队列会各自收到完整消息，互不影响消费进度
 */
async function main() {
  const { channel } = await connect();

  // 消费者侧也要 assertExchange：保证交换机存在，且类型与生产者一致
  await channel.assertExchange(EXCHANGE, 'fanout', { durable: true });

  /**
   * assertQueue：声明真正存消息的容器。
   * durable: true → 队列元数据持久化；消息本身还要配合 persistent 才能落盘。
   */
  await channel.assertQueue(QUEUE, { durable: true });

  /**
   * bindQueue(queue, exchange, routingKey)
   * fanout 不看 routing key，第三个参数传空字符串即可。
   * 绑定成功后：发到该 Exchange 的消息都会进入本队列。
   */
  await channel.bindQueue(QUEUE, EXCHANGE, '');

  console.log(`[fanout] 向量化消费者监听队列: ${QUEUE}`);

  /**
   * consume：从队列拉取消息并处理。
   * 默认需要手动 ack（见下方 channel.ack），处理成功再确认，
   * 这样进程崩溃时未 ack 的消息会重新投递，避免丢任务。
   */
  channel.consume(QUEUE, (msg) => {
    // 取消订阅时可能收到 null，直接返回
    if (!msg) return;

    const data = JSON.parse(msg.content.toString());
    console.log('[vector] 收到消息，开始分片并写入 Milvus:', data.docId, data.source);

    // 实际项目里这里会做：切 chunk → embedding → upsert Milvus
    // 处理成功后再 ack；若失败可 nack / reject 决定是否重入队
    channel.ack(msg);
  });
}

main().catch(console.error);
