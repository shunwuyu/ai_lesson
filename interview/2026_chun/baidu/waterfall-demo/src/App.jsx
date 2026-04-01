import { useEffect, useState } from 'react';
import Waterfall from './components/Waterfall';
import { getMockData } from './mock/data';

export default function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const data = getMockData(20);
    setList(data);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>React 瀑布流 Demo</h2>
      <Waterfall data={list} column={3} gap={10} />
    </div>
  );
}