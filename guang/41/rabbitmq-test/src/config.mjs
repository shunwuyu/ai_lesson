// 入 amqplib 库，用来在 Node.js 里通过 AMQP 协议连接 RabbitMQ 收发消息。
// 高级消息队列协议）Advanced Message Queuing Protocol
import amqp from 'amqplib';

/**
 * RabbitMQ 连接串格式：amqp://用户名:密码@主机:端口/vhost
 *
 * 注意：密码里的特殊字符必须做 URL 编码。
 * 这里默认密码是 Admin@123456，其中 @ 要写成 %40，
 * 否则解析器会把「@123456@localhost」误判成用户名/主机分隔。
 *
 * docker-compose 里默认账号：admin / Admin@123456，端口 5672
 */
export const RABBITMQ_URL =
  process.env.RABBITMQ_URL ||
  'amqp://admin:Admin%40123456@localhost:5672';

/**
 * 建立与 Broker 的连接，并在其上创建 Channel。
 *
 * Connection：客户端与 RabbitMQ 之间的 TCP 物理连接，创建开销较大，通常复用。
 * Channel：Connection 上的逻辑通道。真正收发消息、声明交换机/队列都走 Channel，
 *          这样多个生产者/消费者可以共享一条 TCP 连接，而逻辑上彼此隔离。
 */
export async function connect() {
  // 1. 创建 TCP 连接（对应架构图里的 Connection）
  const connection = await amqp.connect(RABBITMQ_URL);

  // 2. 在连接上开一条逻辑通道（对应架构图里的 Channel）
  const channel = await connection.createChannel();

  return { connection, channel };
}
