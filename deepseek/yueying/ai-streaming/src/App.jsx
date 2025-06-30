import { useState } from 'react'
import './App.css'

function App() {
  const [question, setQuestion] = useState('讲一个关于中国龙的故事');
  const [stream, setStream] = useState(false);
  const [content, setContent] = useState('');

  const update = async () => {
    if (!question) return;
    setContent("思考中...");

    const endpoint = 'https://api.moonshot.cn/v1/chat/completions';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_MOONSHOT_API_KEY}`
    };
    console.log(question);
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [{ role: 'user', content: question }],
        stream: stream,
      })
    });
    if (stream) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let buffer = '';
      setContent("");

      while(!done) {
        const { value, done: doneReading } = await reader?.read();
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
            console.log(delta);
            if (delta) setContent((prev) => prev + delta);
          } catch (ex) {
            buffer += incoming;
          }
        }
      }
    } else {
      const data = await response.json();
      setContent(data.choices[0].message.content)
    }
  }
  return (
    <div className="container">
      <div>
        <label>输入：</label><input className="input" value={question} onChange={(e) => setQuestion(e.target.value)} />
        <button onClick={update}>提交</button>
      </div>
      <div className="output">
        <div><label>Streaming</label><input type="checkbox" value={stream} onChange={(event) => setStream(event.target.checked)} /></div>
        <div>{ content }</div>
      </div>
    </div>
  )
}

export default App
