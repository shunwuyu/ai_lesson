async function getCompletion(client, system, prompt, model = "gpt-3.5-turbo") {
    try {
      const response = await client.chat.completions.create({
        model,
        messages: [
            {role: "system", content: system},
            { role: "user", content: prompt }],
        temperature: 0, // 控制输出的随机性，0表示更确定的输出
      });
  
      return response.choices[0].message.content;
    } catch (error) {
      console.error("Error fetching completion:", error);
      throw error;
    }
}

module.exports = {
    getCompletion
}