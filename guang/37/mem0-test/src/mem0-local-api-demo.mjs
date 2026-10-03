import "dotenv/config";

const BASE_URL = "http://localhost:8888"
const USER_ID =  "local_api_demo";
const API_KEY = process.env.MEM0_LOCAL_API_KEY;

function log(title, data) {
  console.log(`\n=== ${title} ===`);
  console.log(typeof data === "string" ? data : JSON.stringify(data, null, 2));
}

class LocalMem0Client {
  constructor({ baseUrl = BASE_URL, apiKey = API_KEY } = {}) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.apiKey = apiKey;
  }

  headers() {
    const h = { "Content-Type": "application/json" };
    if (this.apiKey) h["X-API-Key"] = this.apiKey;
    return h;
  }

  async request(path, options = {}) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: { ...this.headers(), ...options.headers },
    });
    const text = await res.text();
    let body;
    try {
      body = text ? JSON.parse(text) : null;
    } catch {
      body = text;
    }
    if (!res.ok) {
      const detail = typeof body === "object" ? body.detail ?? JSON.stringify(body) : body;
      throw new Error(`${res.status} ${detail}`);
    }
    return body;
  }

  async add(messages, { userId, runId, agentId, metadata, infer } = {}) {
    const payload = {
      messages: typeof messages === "string"
        ? [{ role: "user", content: messages }]
        : messages,
      user_id: userId,
      run_id: runId,
      agent_id: agentId,
      metadata,
      infer,
    };
    return this.request("/memories", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async getAll({ filters, userId, runId, agentId } = {}) {
    const params = new URLSearchParams();
    const uid = userId ?? filters?.user_id;
    const rid = runId ?? filters?.run_id;
    const aid = agentId ?? filters?.agent_id;
    if (uid) params.set("user_id", uid);
    if (rid) params.set("run_id", rid);
    if (aid) params.set("agent_id", aid);
    const qs = params.toString();
    return this.request(`/memories${qs ? `?${qs}` : ""}`);
  }

  async search(query, { filters, topK = 5, threshold, explain } = {}) {
    return this.request("/search", {
      method: "POST",
      body: JSON.stringify({
        query,
        filters,
        top_k: topK,
        threshold,
        explain,
      }),
    });
  }

  async deleteAll({ userId, runId, agentId } = {}) {
    const params = new URLSearchParams();
    if (userId) params.set("user_id", userId);
    if (runId) params.set("run_id", runId);
    if (agentId) params.set("agent_id", agentId);
    return this.request(`/memories?${params}`, { method: "DELETE" });
  }
}

async function main() {
  const client = new LocalMem0Client();
  const action = process.argv[2] ?? "add";

  if (process.argv.includes("--cleanup")) {
    log("清理测试数据", await client.deleteAll({ userId: USER_ID }));
    return;
  }

  if (action === "add") {
    const added = await client.add(
      [
        { role: "user", content: "我是素食主义者，而且对坚果过敏。" },
        { role: "assistant", content: "好的，我会记住你的饮食偏好。" },
        { role: "user", content: "我住在北京，平时喜欢跑步。" },
        { role: "assistant", content: "已记录：北京、爱好跑步。" },
      ],
      { userId: USER_ID },
    );
    log("添加记忆", added);
    return;
  }

  if (action === "search") {
    log(
      "搜索记忆",
      await client.search("用户的饮食限制是什么？", {
        filters: { user_id: USER_ID },
        topK: Number(process.env.MEM0_TOP_K ?? 5),
      }),
    );
    return;
  }

  if (action === "list") {
    log("列出全部记忆", await client.getAll({ filters: { user_id: USER_ID } }));
    return;
  }

  console.error(`未知命令: ${action}，可用: add | search | list | --cleanup`);
  process.exit(1);
}

main().catch((error) => {
  console.error("\n执行失败:", error.message ?? error);
  process.exit(1);
});
