import { connect } from '../config.mjs';

const EXCHANGE = 'doc.route.headers';

/**
 * 命令行参数：
 *   argv[2]  matchMode  all | any
 *   argv[3]  format     如 pdf / docx
 *   argv[4]  priority   可选，如 high / low
 *
 * all + pdf + high → 要求 format、priority 都匹配，只收「高优先级 PDF」
 * any + pdf        → format 或 priority 任一命中即可（只传 format 时即收所有 pdf）
 */
const matchMode = process.argv[2] || 'all';
const format = process.argv[3] || 'pdf';
const priority = process.argv[4] || 'high';

const QUEUE = `doc.headers.${matchMode}.${format}${priority ? '.' + priority : ''}`;

/**
 * headers 消费者：用 bind 时的 arguments 描述「我关心哪些 header」。
 *
 * 注意：
 *   - bindQueue 的 routing key 传空即可
 *   - 真正的匹配条件放在第四个参数 arguments 里
 *   - x-match 本身不参与和消息 header 的值比较，只是告诉 Broker 用 all 还是 any
 */
async function main() {
  const { channel } = await connect();

  await channel.assertExchange(EXCHANGE, 'headers', { durable: true });
  await channel.assertQueue(QUEUE, { durable: true });

  /** 绑定参数：x-match + 若干业务 header */
  const bindArgs = {
    'x-match': matchMode, // 'all' 全部匹配；'any' 任一匹配
    format,
  };
  if (priority) {
    bindArgs.priority = priority;
  }

  /**
   * bindQueue(queue, exchange, routingKey, arguments)
   * headers 模式下第四个 arguments 才是路由规则本体。
   */
  await channel.bindQueue(QUEUE, EXCHANGE, '', bindArgs);

  console.log(`[headers] 消费者监听队列=${QUEUE}, 匹配条件=`, bindArgs);

  channel.consume(QUEUE, (msg) => {
    if (!msg) return;

    const data = JSON.parse(msg.content.toString());
    // 对照消息自带的 headers，验证是否符合本队列的绑定条件
    console.log('[headers] 收到 headers=', msg.properties.headers, 'body=', data);
    channel.ack(msg);
  });
}

main().catch(console.error);
