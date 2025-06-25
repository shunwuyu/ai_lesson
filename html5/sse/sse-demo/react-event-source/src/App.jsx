import React, { useState } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [assistantReply, setAssistantReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAssistantReply("");
    setLoading(true);

    const response = await fetch("https://api.302.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer sk-G4PA0stfW9KYy075xhshXpwUoiFUl8CdyvBq1Q4wzFbHAlxZ`, // ⛔替换成你的 OpenAI API key
        
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "你是一个有帮助的助手。" },
          { role: "user", content: input },
        ],
        stream: true,
      }),
    });

    if (!response.body) {
      setLoading(false);
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      const lines = chunkValue.split("\n").filter(line => line.trim() !== "");
      for (const line of lines) {
        if (line === "data: [DONE]") return;
        try {
          const json = JSON.parse(line.replace(/^data: /, ""));
          const content = json.choices?.[0]?.delta?.content;
          if (content) {
            setAssistantReply((prev) => prev + content);
          }
        } catch (err) {
          console.error("Could not parse line:", line);
        }
      }
    }

    setLoading(false);
  };

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
