import React, { useState, useEffect } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [assistantReply, setAssistantReply] = useState("");
  const [loading, setLoading] = useState(false);
  let eventSource = null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setAssistantReply("");
    setLoading(true);

    if (eventSource) {
      eventSource.close();
    }

    // 构建请求URL和参数
    const url = new URL(`https://api.deepseek.com/v1/chat/completions?token=sk-4d12ed4bb5184d45a5015f74e7722ed4`);
    // url.searchParams.append("access_token", "sk-4d12ed4bb5184d45a5015f74e7722ed4");
    const params = {
      model: "deepseek-chat", // 替换成DeepSeek提供的模型名称
      messages: JSON.stringify([
        { role: "system", content: "你是一个有帮助的助手。" },
        { role: "user", content: input },
      ]),
      stream: true,
    };

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    // 创建EventSource实例并开始监听
    eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      if (event.data === "[DONE]") {
        setLoading(false);
        eventSource.close();
        return;
      }
      try {
        const json = JSON.parse(event.data);
        const content = json.choices?.[0]?.delta?.content;
        if (content) {
          setAssistantReply((prev) => prev + content);
        }
      } catch (err) {
        console.error("Could not parse message:", err);
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      setLoading(false);
      eventSource.close();
    };
  };

  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "80%", padding: "0.5rem" }}
          placeholder="请输入你的问题..."
        />
        <button type="submit" disabled={loading} style={{ marginLeft: "1rem" }}>
          发送
        </button>
      </form>

      <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>
        <strong>Assistant:</strong> {assistantReply}
      </div>
    </div>
  );
};

export default App;