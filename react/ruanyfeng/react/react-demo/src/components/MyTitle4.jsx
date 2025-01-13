import { useState } from 'react';

const MyTitle = ({ color = 'red' }) => {
  const [name, setName] = useState('访问者')
  const handleChange = (e) => {
    setName(e.target.value)
  }
  return (
    <h1 style={{color: color}}>
      <input type="text" value={name} onChange={handleChange} />
      <p>你好，{name}</p>
    </h1>
  )
}

export default MyTitle;