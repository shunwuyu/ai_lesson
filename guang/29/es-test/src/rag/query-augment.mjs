/**
 * 用大模型根据用户问题生成恰好 3 条不同角度的检索问句；每条问句各自走 ES / Milvus，最后合并去重。
 */
import { ChatPromptTemplate } from "@langchain/core/prompts";
import * as z from "zod";

export const QueryAugmentationSchema = z.object({
  queries: z
    .array(z.string())
    .length(3)
    .describe(
      "恰好 3 条中文检索问句：不同角度改写或扩写；保留订单号、品牌等字面信息；不要编造事实",
    ),
});

const AUGMENT_PROMPT = ChatPromptTemplate.fromMessages([
  [
    "system",
    `用户会给出一句中文问题。请另外写出恰好 3 条检索用的问句（与原意一致、角度尽量不同），便于搜索引擎或向量库分别召回：
可改写说法、换提问角度、或略加限定词；专有名词、型号、订单号等必须保留原样。
只输出结构化字段 queries（长度为 3 的字符串数组）。`,
  ],
  ["human", "{query}"],
]);

function normalizeThreeQueries(original, list) {
  const out = (list ?? [])
    .map((s) => (typeof s === "string" ? s.trim() : ""))
    .filter(Boolean);
  while (out.length < 3) out.push(original);
  return out.slice(0, 3);
}


export async function augmentQuery(chatModel, query) {
  const structured = chatModel.withStructuredOutput(QueryAugmentationSchema);
  const chain = AUGMENT_PROMPT.pipe(structured);
  try {
    const raw = await chain.invoke({ query });
    return { queries: normalizeThreeQueries(query, raw.queries) };
  } catch {
    return { queries: normalizeThreeQueries(query, []) };
  }
}

/** 原始问题在前，其后接 LLM 生成的问句；不做去重，顺序固定；每条各跑一次 ES、Milvus */
export function retrievalQueryStrings(original, augmentation) {
  return [original, ...(augmentation?.queries ?? [])]
    .map((s) => (typeof s === "string" ? s.trim() : ""))
    .filter(Boolean);
}
