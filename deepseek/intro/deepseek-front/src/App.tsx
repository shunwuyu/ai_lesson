import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const ChatApi = async (message) => {
  
  // 这里需要替换为实际调用Qwen或其他模型的API逻辑
  const response = await axios.post('http://localhost:3001/chatai', message, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.log(response);
  return response.data;
};

const App = () => {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedConversation = localStorage.getItem("conversation");
    if (storedConversation) {
      setConversation(JSON.parse(storedConversation));
    }
  }, []);

  const askQuestion = async () => {
    if (!question.trim()) {
      return;
    }

    setConversation((prevConversation) => [
      ...prevConversation,
      { question: question, answer: "等待回答..." },
    ]);

    setLoading(true);
    try {
      const message = `你是一个聪明的机器人，我想知道:${question}`;
      const response = await ChatApi({ message });
      console.log("Response:", response);
      setConversation((prevConversation) => {
        prevConversation[prevConversation.length - 1].answer = response;
        localStorage.setItem("conversation", JSON.stringify(prevConversation));
        return [...prevConversation];
      });
    } catch (error) {
      console.error("Error invoking API:", error);
      setConversation((prevConversation) => {
        prevConversation[prevConversation.length - 1].answer = "发生错误，请重试。";
        return [...prevConversation];
      });
    } finally {
      setLoading(false);
      setQuestion("");
    }
  };

  return (
    <div className="chat-container" style={{ position: 'relative' }}>
      <p className="chat-title">我是本地大模型 套壳ai</p>
      {conversation.map((item, index) => (
        <div key={index} className="chat-message">
          <div className="chat-question">
            <span className="el-tag el-tag--large">me:</span> {item.question}
          </div>
          <div className="chat-answer">
          {item.answer.content}
          <span className="el-tag el-tag--large">ai:</span>
          </div>
        </div>
      ))}
      <div className="chat-input">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && askQuestion()}
          style={{ width: '80%' }}
        />
        <button onClick={askQuestion}>提交</button>
      </div>
      {loading && (
        <div className="loading-container">
          <p>加载中...</p>
        </div>
      )}
    </div>
  );
}

export default App