import React, { useEffect, useState } from 'react';

const App = () => {
  const [streamData, setStreamData] = useState('');

  useEffect(() => {
    const eventSource = new EventSource('/stream');

    eventSource.onmessage = (event) => {
      if (event.data) {
        setStreamData((prevData) => prevData + event.data);
      }
    };

    eventSource.onerror = (error) => {
      console.error('Error in EventSource:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>大模型流式输出示例</h1>
      <p>{streamData}</p>
    </div>
  );
};

export default App;