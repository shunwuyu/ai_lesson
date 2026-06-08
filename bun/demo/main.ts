import axios from "axios";

// 替换成你的 OpenAI API Key

async function chat() {
  try {
    const res = await axios.post(
      `${process.env.DEEPSEEK_BASE_URL}/chat/completions`,
      {
        model: "deepseek-v4-flash",
        messages: [{ role: "user", content: "你好，介绍一下Bun" }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
      }
    );

    // 输出 AI 回复
    console.log(res.data.choices[0].message.content);
  } catch (err) {
    console.error("请求失败：", err.response?.data || err.message);
  }
}

chat();