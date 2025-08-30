<script setup lang="ts">
import { ref } from 'vue';
import MarkdownIt from 'markdown-it';
//MarkdownIt 是一个功能强大、可扩展的 JavaScript 库，用于将 Markdown 文本解析并渲染为 HTML。
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

// 输入、输出、是否流式
const question = ref('讲一个关于中国龙的故事');
const content = ref('');
const htmlContent = ref('');
const stream = ref(true);

// markdown 渲染器，支持代码高亮
const md = new MarkdownIt({
    // 定义代码块高亮函数
  highlight: function (str, lang) {
    console.log(str, lang, '/////');
    // 检查是否指定了语言且该语言被 highlight.js 支持 css? js?
    if (lang && hljs.getLanguage(lang)) {
      try {
        // 使用 highlight.js 对代码进行语法高亮
        return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`;
      } catch (_) {}
    }
    // 若无语言或高亮失败，退化为转义 HTML 的纯文本显示
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  }
});

// 更新函数
const update = async () => {
  if (!question.value) return;
  content.value = "思考中...";
  htmlContent.value = md.render(content.value);

  const endpoint = 'https://api.moonshot.cn/v1/chat/completions';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_MOONSHOT_API_KEY}`
  };

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
    // 1. 获取响应体的读取器，用于处理流式数据
    const reader = response.body?.getReader();
    // 2. 创建文本解码器，将二进制数据（Uint8Array）转为字符串
    const decoder = new TextDecoder();
    // 标记流是否结束
    let done = false;
    // 缓存不完整的 JSON 数据，防止解析中断
    let buffer = '';
    // 存储原始的、逐步拼接的 Markdown 文本
    content.value = '';
    // 存储渲染后的 HTML 内容，用于页面展示
    htmlContent.value = '';
    // 3. 循环读取流数据，直到结束
    while (!done) {
    // 读取下一个数据块（Promise<{ value: Uint8Array, done: boolean }>)
      const { value, done: doneReading } = await (reader?.read() as Promise<{ value: any; done: boolean }>);
      // 更新结束状态
      done = doneReading;
      // 4. 将二进制块解码为字符串，并与上一轮残留的 buffer 拼接
      const chunkValue = buffer + decoder.decode(value);
      buffer = '';// 清空 buffer，准备下一轮
        // 5. 按换行分割，筛选出以 'data: ' 开头的 SSE 格式消息
      const lines = chunkValue.split('\n').filter((line) => line.startsWith('data: '));
        // 6. 逐行处理每个数据片段
      for (const line of lines) {
        const incoming = line.slice(6);
        // 去掉 'data: ' 前缀
        if (incoming === '[DONE]') {
          done = true;
          break;
        }
        try {
          // 8. 尝试解析 JSON 数据（如 OpenAI 的 SSE 响应格式）
        //   Server-Sent Events
            console.log(incoming, '-------------')
          const data = JSON.parse(incoming);
          
        //   delta 是一个对象，表示本次流式响应新生成的那一小段内容。
          const delta = data.choices[0].delta.content;
          if (delta) {
            content.value += delta;
            htmlContent.value = md.render(content.value); // 关键：实时渲染 Markdown
          }
        } catch (ex) {
          buffer += incoming;
        }
      }
    }
  } else {
    const data = await response.json();
    content.value = data.choices[0].message.content;
    htmlContent.value = md.render(content.value);
  }
};
</script>

<template>
  <div class="container">
    <div>
      <label>输入：</label>
      <input class="input" v-model="question" />
      <button @click="update">提交</button>
    </div>

    <div class="output">
      <div>
        <label>Streaming</label>
        <input type="checkbox" v-model="stream" />
      </div>
      <!-- 渲染 markdown + 代码高亮 -->
      <div v-html="htmlContent" class="prose max-w-none"></div>
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
  font-size: .9rem;
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

/* 让 markdown 渲染更美观，可以配合 tailwindcss typography 插件 */
.prose {
  line-height: 1.6;
}
</style>
