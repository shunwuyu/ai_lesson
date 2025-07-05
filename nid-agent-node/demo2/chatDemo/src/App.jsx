import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!text.trim() || loading) return;
    
    setLoading(true);
    try {
      const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer sk-d2a956f49ee245ae9e37af93f5441d14`
        },
        body: JSON.stringify({
          temperature: 1.0,
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: '你是一位来自字节跳动的助理'
            },
            {
              role: 'user',
              content: 'My name is wanghao'
            },
            { 
              role: 'user', content: text 
            }
          ]
        })
      });
      
      const data = await res.json();
      setMessage(data.choices[0]?.message?.content || 'No response');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to fetch response');
    } finally {
      setLoading(false);
      setText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Chat</h1>
      
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          style={{ 
            flex: 1, 
            padding: '10px', 
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px 0 0 4px'
          }}
          disabled={loading}
        />
        <button
          onClick={send}
          style={{
            padding: '10px 20px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '0 4px 4px 0',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
      
      <div style={{
        padding: '15px',
        border: '1px solid #eee',
        borderRadius: '4px',
        minHeight: '50px',
        background: '#f9f9f9'
      }}>
        {message || (loading ? 'Loading...' : 'Response will appear here')}
      </div>
    </div>
  );
}

export default App;