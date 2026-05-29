import { useState } from 'react';

const MyTitle = ({ color = 'red' }) => {
  const [text, setText] = useState('World')
  const handleClick = (e) => {
    setText('clicked')
  }
  return (
    <h1 style={{color: color}} onClick={handleClick}>
      hello {text}
    </h1>
  )
}

export default MyTitle;