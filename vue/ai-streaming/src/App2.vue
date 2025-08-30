<script setup lang="ts">
import { ref } from 'vue';

const question = ref('讲一个关于中国龙的故事');
const content = ref('');
const stream = ref(true);

const update = async () => {
  if (!question) return;
  content.value = "思考中...";

  const endpoint = 'https://api.moonshot.cn/v1/chat/completions';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_MOONSHOT_API_KEY}`
  };

  console.log(question.value);
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      model: 'moonshot-v1-8k',
      messages: [{ role: 'user', content: question.value }],
      stream: stream.value,
    })
  });

  if (stream.value) {
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let buffer = '';
    content.value = '';

    while (!done) {
      const { value, done: doneReading } = await (reader?.read() as Promise<{ value: any; done: boolean }>);
      done = doneReading;
      const chunkValue = buffer + decoder.decode(value);
      buffer = '';

      const lines = chunkValue.split('\n').filter((line) => line.startsWith('data: '));

      for (const line of lines) {
        const incoming = line.slice(6);
        if (incoming === '[DONE]') {
          done = true;
          break;
        }
        try {
          const data = JSON.parse(incoming);
          const delta = data.choices[0].delta.content;
          if (delta) content.value += delta;
        } catch (ex) {
          buffer += incoming;
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
      <div><label>Streaming</label><input type="checkbox" v-model="stream" /></div>
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