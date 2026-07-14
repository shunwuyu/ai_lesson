<script setup lang="ts">
import { ref } from 'vue';

const question = ref('讲一个关于中国龙的故事');
const content = ref('');
const stream = ref(true);

const update = async () => {
  if (!question) return;
  content.value = "思考中...";

  const endpoint = 'https://api.deepseek.com/chat/completions';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`
  };

  console.log(question.value);
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      model: 'deepseek-v4-flash',
      messages: [{ role: 'user', content: question.value }],
      stream: stream.value,
    })
  });

  if (stream.value) {
    // ReadableStream<Uint8Array> 标准stream API
    // 可读流，像水管一样一边收一边读，不用等全部下完。
    // ReadableStream 是水管，getReader() 是水龙头。
    const reader = response.body?.getReader();
    // 文本编解码器二进制 把字节解码成人能读的文本， 反之亦然。
    const decoder = new TextDecoder();
    let done = false;
    let buffer = '';
    content.value = '';

    while (!done) {
      // 像从水管里嘬一口水。
      // 每嘬一口可能只嘬到一部分，所以得在 while 循环里一口一口嘬完。
      // 没数据就挂起等待，有数据或流结束了才 resolve。
      // 底层缓冲区有数据了，自动返回
      // 你又调用下一次 read()，继续等 
      // value 是Uint8Array 字节。
      // 为什么要有两个done?
      // doneReading 流物理上读完了，TCP 连接关闭，不会再有任何数据过来 传输层的信号
      const { value, done: doneReading } = await (reader?.read() as Promise<{ value: any; done: boolean }>);
      done = doneReading;
      // 上一轮没切完的字符片段
      const chunkValue = buffer + decoder.decode(value);
      buffer = ''; // 清掉，因为已经用掉了
      // SSE 协议
      // Server Send Event 
      // 服务端主动向客户端推送文本数据，一行一条消息，格式固定 data: 内容\n\n。 是的，它是 HTTP           
  // 协议之上的服务端协议，llm 服务器使用了sse。 
      const lines = chunkValue.split('\n').filter((line) => line.startsWith('data: '));

      for (const line of lines) {
        // 过滤掉空行
        if (!line) continue;
        // data: 这5个字符不要
        const incoming = line.slice(6);
        if (incoming === '[DONE]') {
          // done = true — 流还在传输，但业务数据发完了，服务器主动跟你说"发完了，后面的不用读了"
          // 应用层的信号
          // https://i-blog.csdnimg.cn/blog_migrate/69a9ceda6e8cdcb0f8924d0895c8c197.png
          done = true;
          break;
        }
        try {
          // 解析 JSON 字符串
          // delta 是服务器返回的增量内容
          const data = JSON.parse(incoming);
          // delta 中文直译就是增量 
          // LLM 流式返回时，每次只发新增加的那一小段文本，不是重复发整句
          const delta = data.choices[0].delta.content;
          if (delta) content.value += delta;
        } catch (ex) {
          // 当 incoming 不是完整 JSON 时走 catch。
          // 服务器分两批发：                                                                                  
          // - 第 1 批行：data: {"choices":[{"delta":{"conten                                                  
          // - 第 2 批行：data: t":"hello"}}]} 
          // 第 1 批 incoming = {"choices":[{"delta":{"conten"，JSON.parse() 直接报错，进 catch 存到 buffer。  
          // 第 2 批进来，incoming = t":"hello"}}]}，buffer + incoming 拼成完整 JSON，再解析。                 

          // 简单说：数据被切断了，JSON 不完整，先存着等下一批拼好再解析。
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