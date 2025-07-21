import { useState } from 'react'
import './App.css'
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => props.primary ? 'blue' : 'white'};
  color: ${props => props.primary ? 'white' : 'black'};
  border: 1px solid blue;
  padding: 8px 16px;
  border-radius: 4px;
`;


function App() {

  return (
    <>
      <Button>默认按钮</Button>
      <Button primary>主按钮</Button>
    </>
  )
}

export default App
