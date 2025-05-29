import React, { useState } from 'react';

function App() {
  const [title] = useState('旅梦朋友们');
  const [friends] = useState([
    {
      name: '黄新天',
      hometown: '山东临沂',
      company: '字节'
    },
    {
      name: '曾欣',
      hometown: '抚州',
      company: '字节'
    }
  ]);

  return (
    <div>
      <h1>{title}</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>名字</th>
            <th>家乡</th>
            <th>梦想公司</th>
          </tr>
        </thead>
        <tbody>
          {friends.map((friend, index) => (
            <tr key={index}>
              <td>{friend.name}</td>
              <td>{friend.hometown}</td>
              <td>{friend.company}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;