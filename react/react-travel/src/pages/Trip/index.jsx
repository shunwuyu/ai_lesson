import React, { useState, useRef, useEffect } from 'react'
import { Input, Button } from 'react-vant'
import styles from './trip.module.css'
import {
   UserO,
   ChatO
} from '@react-vant/icons'
import { chat } from '../../llm/index'
// 模拟 chat 接口，真实使用时替换为实际接口调用

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: 'hello'
    },
    {
      role: 'user',
      content: 'hi'
    }
  ])
  const [input, setInput] = useState('')
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMsg = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMsg])
    setInput('')

    const {content} = await chat(messages)
    // console.log(reply);
    const assistantMsg = { role: 'assistant', content: content }
    setMessages((prev) => [...prev, assistantMsg])
  }

  return (
    <div className={styles.container}>
      <div className={styles.chatArea}>
        <div style={{height:'70vh'}}></div>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.role === 'user'
                ? styles.messageRight
                : styles.messageLeft
            }
          >
            {msg.role === 'system' ? (
              <ChatO/>
            ):(
              <UserO />
            )}
            {msg.content}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className={styles.inputArea}>
        <Input
          value={input}
          onChange={setInput}
          placeholder="请输入消息"
          className={styles.input}
        />
        <Button type="primary" onClick={handleSend}>
          发送
        </Button>
      </div>
    </div>
  )
}
