import { useEffect, useRef, useState } from "react";
import {Streamdown} from "streamdown";

export default function App() {
  const [md, setMd] = useState("");
  const esRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // 连接到后端接口地址，类似 http 接口
    const es = new EventSource("http://localhost:8787/sse");
    esRef.current = es;

    es.onopen = () => setConnected(true);
    es.onerror = (e) => {
      console.warn("SSE error", e);
      setConnected(false);
      // 由浏览器自动重试；也可在此关闭并手动重连
    };
    es.addEventListener("message", (ev) => {
      try {
        // 这里服务端直接推送原始文本；如果是 JSON，需解析后取字段
        const text = String(ev.data);
        const realText = text.replace(/\\n/g, "\n");
        // 增量拼接：避免频繁渲染，可批量缓冲
        setMd((prev) => prev + realText);
      } catch (err) {
        console.error(err);
      }
    });
    es.addEventListener("end", () => {
      // 收到结束事件，可做滚动、动画或解锁 UI
      console.info("stream end");
      es.close();
      setConnected(false);
    });

    return () => {
      es.close();
      setConnected(false);
    };
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h3>SSE + Streamdown Markdown Streaming</h3>
      <p>连接状态：{connected ? "已连接" : "未连接"}</p>
      <Streamdown
        // 核心：容忍未完成 Markdown，边到边渲染
        parseIncompleteMarkdown
        shikiTheme="github-dark"
        // 安全前缀：限制链接与图片前缀，避免 XSS
        components={{
          a: {
            allowedPrefix: ["https://", "http://"],
          },
          img: {
            allowedPrefix: ["https://", "http://"],
          },
        }}
      >
        {md}
      </Streamdown>
    </div>
  );
}

