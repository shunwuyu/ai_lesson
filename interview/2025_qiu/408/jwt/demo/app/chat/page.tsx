// App.tsx
"use client";
import React, { useState, useRef } from 'react';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

// 初始化 Markdown 解析器，支持语法高亮
const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`;
      } catch (__) {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
});

const App: React.FC = () => {
  const [question, setQuestion] = useState<string>('讲一个关于中国龙的故事');
  const [content, setContent] = useState<string>(''); // 原始 Markdown 内容
  const [htmlContent, setHtmlContent] = useState<string>(''); // 渲染后的 HTML
  const [stream, setStream] = useState<boolean>(true);
  const contentRef = useRef<string>(''); // 用于在流式过程中暂存内容

  const update = async () => {
    if (!question.trim()) return;

    // 开始流式输出提示
    setContent('思考中...');
    setHtmlContent(md.render('思考中...'));
    contentRef.current = '';

    const endpoint = 'https://api.moonshot.cn/v1/chat/completions';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer sk-crHU4OeCYeTLwnU1RoDLfvKDs73qanqQ1a2SeAUMkniXJKpF`,
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [{ role: 'user', content: question }],
        stream: stream,
      }),
    });

    if (!response.body) return;

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let buffer = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;

      const chunk = buffer + decoder.decode(value);
      buffer = '';
      const lines = chunk.split('\n').filter(line => line.startsWith('data: '));

      for (const line of lines) {
        const dataStr = line.slice(6); // 去除 'data: '
        if (dataStr === '[DONE]') {
          done = true;
          break;
        }

        try {
          const data = JSON.parse(dataStr);
          const delta = data.choices?.[0]?.delta?.content;
          if (delta) {
            contentRef.current += delta;
            const markdownText = contentRef.current;
            setContent(markdownText);
            setHtmlContent(md.render(markdownText));
          }
        } catch (err) {
          buffer += dataStr; // 可能是不完整的 JSON，暂存
        }
      }
    }

    reader.releaseLock();
  };

  return (
    <div className="container">
      <div>
        <label>输入：</label>
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          className="input"
        />
        <button onClick={update}>提交</button>
      </div>

      <div className="output">
        <div>
          <label>Streaming</label>
          <input type="checkbox" checked={stream} onChange={e => setStream(e.target.checked)} />
        </div>
        <div
          className="prose max-w-none"
          style={{ lineHeight: '1.6', textAlign: 'left', marginTop: '10px' }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
};

export default App;