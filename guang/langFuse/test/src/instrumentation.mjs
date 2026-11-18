/** 必须最先加载：启动 OTEL，把 span 导出到 Langfuse */
import "dotenv/config";
// Langfuse 基于opentelemetry 
// OpenTelemetry 是一套开源可观测规范与工具，用来统一采集服务的链路、指标、日志，方便追踪排查系统性能和报错。
// Node 端监控 SDK
import { NodeSDK } from "@opentelemetry/sdk-node";
// OTel 全称：OpenTelemetry
// `@langfuse/otel` 就是 Langfuse 对接 OpenTelemetry 的包。
// LangfuseSpanProcessor 是 OTel 的处理器，把采集到的链路 span 转发给 Langfuse，用来记录大模型调用轨迹。
// **Span：一次独立操作的记录单元**，比如一次 LLM 调用、一次数据库查询，
// 包含它的起止时间、耗时、入参、报错、父子关联关系。
// 多个有父子关系的 span 拼在一起，就是整条调用链路（trace）。
import { LangfuseSpanProcessor } from "@langfuse/otel";

console.log(process.env.LANGFUSE_PUBLIC_KEY, '-----------');

// 配置 LangfuseSpanProcessor，把 span 导出到 Langfuse
export const langfuseSpanProcessor = new LangfuseSpanProcessor({
  publicKey: process.env.LANGFUSE_PUBLIC_KEY,
  secretKey: process.env.LANGFUSE_SECRET_KEY,
  baseUrl: process.env.LANGFUSE_BASE_URL,
  // "immediate"：span 结束就尽快导出，适合短脚本；默认 "batched" 适合长驻服务
  exportMode: "immediate",
});
// 启动 OTel SDK，开始采集 span
const sdk = new NodeSDK({
  spanProcessors: [langfuseSpanProcessor],
});
// sdk.start () 启动 OTel，开始自动采集程序里的 span，交给 Langfuse 处理器，
// 实时把链路数据上报 Langfuse 做 LLM 调用追踪。
sdk.start();

export async function shutdownTracing() {
  // 将所有未导出的 span 强制导出到 Langfuse
  await langfuseSpanProcessor.forceFlush();
  // 关闭 OTel SDK，停止采集 span
  await sdk.shutdown();
}
