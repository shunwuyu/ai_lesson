<script setup>
import { ref } from 'vue';

const question = ref('讲一个关于中国龙的故事');
const content = ref('');
const stream = ref(true);

const update = async () => {
  if(!question) return;
  content.value = "思考中...";

  const endpoint = 'https://api.deepseek.com/chat/completions';
  const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      model: 'deepseek-v4-flash',
      messages: [{ role: 'user', content: question.value }],
      stream: stream.value,
    })
  });

  if(stream.value) {
    content.value = '';
    // 处理流式响应
    // 服务器响应对象
    const reader = response.body?.getReader();
    // 把二进制流数据解码成人类能看懂的字符串的工具
    const decoder = new TextDecoder();
    let done = false;
    let buffer = '';

    while (!done) {
      const { value, done: doneReading } = await (reader?.read());
      done = doneReading;
      // 合并当前数据块
      const chunkValue = buffer + decoder.decode(value);
      buffer = '';
      // 解析流式响应数据
      const lines = chunkValue.split('\n').filter((line) => line.startsWith('data: '));

      for (const line of lines) {
        // 解析每行数据
        const incoming = line.slice(6);
        // 处理流式响应结束标志
        if(incoming === '[DONE]') {
          done = true;
          break;
        }
        try {
          // 解析JSON数据
          const data = JSON.parse(incoming);
          // 提取流式响应内容
          const delta = data.choices[0].delta.content;
          // 拼接流式响应内容到输出区域
          if(delta) content.value += delta;
        } catch(ex) {
          buffer += `data: ${incoming}`;
        }
      }
    }
  } else {
    // 处理非流式响应
    const data = await response.json();
    content.value = data.choices[0].message.content;
  }
}
</script>

<template>
  <div class="container">
    <div>
      <label>输入：</label><input class="input" v-model="question" />
      <button @click="update">提交</button>
    </div>
    <div class="output">
      <div><label>Streaming</label><input type="checkbox" v-model="stream"/></div>
      <div>{{ content }}</div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  height: 100vh;
  font-size: .85rem;
}
.input {
  width: 200px;
}
.output {
  margin-top: 10px;
  min-height: 300px;
  width: 100%;
  text-align: left;
}
button {
  padding: 0 10px;
  margin-left: 6px;
}
</style>