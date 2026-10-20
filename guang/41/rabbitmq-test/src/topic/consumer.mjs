import { connect } from '../config.mjs';

const EXCHANGE = 'doc.event.topic';

/**
 * 绑定模式（binding key）示例，对照 producer 发出的四条消息：
 *
 *   doc.*.parsed  → 收 doc.pdf.parsed、doc.docx.parsed
 *                   （中间一段任意，末尾必须是 parsed）
 *                   不收 *.failed
 *
 *   doc.pdf.#     → 收 doc.pdf.parsed、doc.pdf.failed
 *                   （pdf 后面无论还有几段都匹配）
 *
 *   doc.#         → 收全部 doc. 开头的事件
 *
 *   #.failed      → 收所有以 failed 结尾的事件
 */
const bindingKey = process.argv[2] || 'doc.*.parsed';

/** 队列名里把通配符换成下划线，避免特殊字符带来困扰 */
const QUEUE = `doc.topic.${bindingKey.replace(/[.#*]/g, '_')}`;

/**
 * topic 消费者：用「模式」订阅一类 routing key，而不是写死某一个。
 */
async function main() {
  const { channel } = await connect();

  await channel.assertExchange(EXCHANGE, 'topic', { durable: true });
  await channel.assertQueue(QUEUE, { durable: true });

  /**
   * 第三个参数这里是「模式」，不是精确字符串。
   * Broker 会用该模式去匹配每条消息的 routing key，命中才入队。
   */
  await channel.bindQueue(QUEUE, EXCHANGE, bindingKey);

  console.log(`[topic] 消费者监听队列=${QUEUE}, bindingKey=${bindingKey}`);

  channel.consume(QUEUE, (msg) => {
    if (!msg) return;

    const data = JSON.parse(msg.content.toString());
    // msg.fields.routingKey 是生产者实际发送时的 key，便于对照绑定模式是否符合预期
    console.log(
      `[topic] routingKey=${msg.fields.routingKey}, binding=${bindingKey}, 内容:`,
      data,
    );
    channel.ack(msg);
  });
}

main().catch(console.error);
