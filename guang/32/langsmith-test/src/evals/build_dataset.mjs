import "dotenv/config";
import { Client } from "langsmith";

const DATASET_NAME = "rag-eval-v1";

const EXAMPLES = [
  {
    inputs: { question: "无理由退货要在几天内申请？" },
    outputs: { answer: "自签收之日起 7 天内支持无理由退货。" },
  },
  {
    inputs: { question: "质量问题换货期限是多久？" },
    outputs: { answer: "15 天内出现质量问题可免费换货。" },
  },
  {
    inputs: { question: "无理由退货运费谁承担？" },
    outputs: { answer: "无理由退货由买家承担退货运费。" },
  },
  {
    inputs: { question: "客服工作时间是什么？" },
    outputs: { answer: "周一至周五 9:00-18:00，周六 10:00-17:00，法定节假日顺延。" },
  },
  {
    inputs: { question: "满多少元包邮？" },
    outputs: { answer: "满 99 元包邮（部分大件/冷链除外）。" },
  },
  {
    inputs: { question: "现货商品多久发货？" },
    outputs: { answer: "付款后 24 小时内发货，大促期间 48 小时内。" },
  },
  {
    inputs: { question: "支持哪些支付方式？" },
    outputs: {
      answer: "支持微信支付、支付宝、银联云闪付、花呗/信用卡分期（满 500 元可选 3/6/12 期）。",
    },
  },
  {
    inputs: { question: "价保是多久？" },
    outputs: { answer: "下单后 7 天内同款降价可申请差价退还。" },
  },
  {
    inputs: { question: "金卡会员有什么折扣？" },
    outputs: { answer: "金卡享 95 折，并有专属客服和每月满 200 减 30 券。" },
  },
  {
    inputs: { question: "积分多少可以抵 1 元？" },
    outputs: { answer: "100 积分可抵 1 元，单笔最多抵扣实付金额的 30%。" },
  },
  {
    inputs: { question: "手机保修多久？" },
    outputs: { answer: "手机、平板、耳机全国联保 1 年。" },
  },
  {
    inputs: { question: "紧急问题怎么联系？" },
    outputs: { answer: "可拨打 400-800-1234 转 2，接通后报订单号。" },
  },
];

async function main() {
  const client = new Client({ apiKey: process.env.LANGCHAIN_API_KEY });

  let dataset;
  try {
    dataset = await client.readDataset({ datasetName: DATASET_NAME });
    console.log(`数据集已存在: ${DATASET_NAME}`);
  } catch {
    dataset = await client.createDataset(DATASET_NAME, {
      description: "RAG Agent 回归评估集",
    });
    console.log(`已创建数据集: ${DATASET_NAME}`);
  }

  const created = await client.createExamples(
    EXAMPLES.map((e) => ({
      dataset_id: dataset.id,
      inputs: e.inputs,
      outputs: e.outputs,
    })),
  );

  console.log(`已创建 ${created.length} 条样例`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
