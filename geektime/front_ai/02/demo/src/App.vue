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
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: question.value }],
      stream: stream.value,
    })
  });

  if(stream.value) {
    content.value = '';
    // HTML5 标准的 Streams API 来处理数据
    // LLM 返回的是二进制流 ，需要通过 reader 来读取
    // API 返回流式数据的协议是每一条数据以 “data:” 开头，
    // 后续是一个有效的 JSON 或者[DONE]表示传输结束，
    // 所以我们要对每一行以"data:"开头的数据进行处理。
    const reader = response.body?.getReader();
    // TextDecoder 是 HTML5（更准确说是 Web API）的一部分。
    // 二进制数据解码为字符串
    const decoder = new TextDecoder();
    let done = false;
    let buffer = '';

    while (!done) {
      const { value, done: doneReading } = await (reader?.read());
      done = doneReading;
      const chunkValue = buffer + decoder.decode(value);
      buffer = '';

      const lines = chunkValue.split('\n').filter((line) => line.startsWith('data: '));

      for (const line of lines) {
        const incoming = line.slice(6);
        if(incoming === '[DONE]') {
          done = true;
          break;
        }
        // 如果数据传输完整，且不是[DONE]，
        // 那么它就是合法 JSON，我们从中读取 
        // data.choices[0].delta.content，
        // 就是需要增量更新的内容，否则说明数据不完整，
        // 将它存入缓存，以便后续继续处理。
        try {
          const data = JSON.parse(incoming);
          const delta = data.choices[0].delta.content;
          if(delta) content.value += delta;
        } catch(ex) {
          buffer += `data: ${incoming}`;
        }
      }
    }
  } else {
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