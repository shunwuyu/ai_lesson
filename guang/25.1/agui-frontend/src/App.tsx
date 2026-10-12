// Vercel AI SDK 的 React 钩子，管理对话状态，接收后端 SSE 流，
// 自动更新 messages，封装发送消息、中止流等聊天能力
// React 专用 UI 包，提供 useChat 钩子，管理聊天状态。
import { useChat } from '@ai-sdk/react'
// 框架无关底层包 提供消息类型、SSE 传输器
import { 
  // 默认的聊天传输器，支持 SSE 流
  DefaultChatTransport, 
  // 框架无关的前端消息模型, 直接渲染 
  type UIMessage 
} from 'ai'
// useMemo 缓存计算结果，依赖不变时不会重复执行耗时计算，减少 React 组件不必要的开销。
// useCallback 缓存函数，依赖不变时不会重复创建函数实例，减少 React 组件不必要的开销。
import { useMemo, useState } from 'react'
// 自定义组件，渲染工具调用结果
import { MessagePart } from './components/ToolPanels'
import './App.css'

/** 后端根地址（与本地 `agui-backend` 默认端口一致） */
const API_BASE = 'http://localhost:3000'

export default function App() {
  const chatUrl = `${API_BASE}/ai/chat`
  // useMemo**第一个参数是一个返回计算结果的函数**，第二个是依赖数组。
  const transport = useMemo(
    () =>
      // 初始化默认聊天传输器，指定后端 API 地址
      new DefaultChatTransport({
        api: chatUrl,
      }),
    [chatUrl],
  )
  // useChat 钩子，管理聊天状态。提供 messages, sendMessage, status, stop, error, clearError 函数。
  const { messages, sendMessage, status, stop, error, clearError } = useChat<UIMessage>({
    transport,
  })
  const [input, setInput] = useState('')
  // busy 标记 AI 请求正在进行
  const busy = status === 'submitted' || status === 'streaming'
  // 可以发送消息
  const canSend = status === 'ready' && input.trim().length > 0
  // 最后一条助手消息
   const lastAssistant = messages.filter((m) => m.role === 'assistant').at(-1)

  return (
    <div className="chat-app">
      <header className="chat-header">
        <div>
          <h1>agui</h1>
          <p className="chat-sub">后端：{chatUrl}</p>
        </div>
        {busy && (
          <button type="button" className="btn-stop" onClick={() => stop()}>
            停止
          </button>
        )}
      </header>

      <div className="chat-messages" role="log" aria-live="polite">
        {messages.length === 0 && (
          <p className="chat-empty">
            输入问题开始对话
          </p>
        )}

        {/* 1. Agent：先吐出文字 `我帮你查南昌天气` → `text part`
2. Agent：决定调用天气工具 → `tool-call part`
3. 工具返回天气数据
4. Agent：基于工具结果继续输出文字 `南昌28度` → 新的`text part`

全部打包进**一条 message.parts**，不是多条消息，也不是多个 Agent。 */}
        {messages.map((message) => {
          // Agent 输出是分段交错的 
          const textPartIndices = message.parts
            .map((p, i) => (p.type === 'text' ? i : -1))
            .filter((i) => i >= 0) // 过滤出 text part 的索引
          const lastTextPartIdx = textPartIndices[textPartIndices.length - 1]

          return (
            <article
              key={message.id}
              className={`chat-bubble chat-bubble--${message.role}`}
            >
              <span className="chat-role">
                {message.role === 'user' ? '你' : '助手'}
              </span>
              <div className="chat-body">
                {message.parts.map((part, index) => (
                  <MessagePart
                    key={`${message.id}-p-${index}`}
                    part={part}
                    textStreamActive={
                      part.type === 'text' &&
                      message.role === 'assistant' &&
                      message.id === lastAssistant?.id &&
                      index === lastTextPartIdx &&
                      busy
                    }
                  />
                ))}
              </div>
            </article>
          )
        })}
      </div>

      {error && (
        <div className="chat-error" role="alert">
          <span>{error.message}</span>
          <button type="button" onClick={() => clearError()}>
            关闭
          </button>
        </div>
      )}

      <form
        className="chat-form"
        onSubmit={(e) => {
          e.preventDefault()
          if (!canSend) return
          void sendMessage({ text: input })
          setInput('')
        }}
      >
        <textarea
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              if (canSend) {
                void sendMessage({ text: input })
                setInput('')
              }
            }
          }}
          placeholder="输入消息，Enter 发送，Shift+Enter 换行"
          rows={3}
          disabled={status !== 'ready'}
          aria-label="消息输入"
        />
        <div className="chat-actions">
          <span className="chat-status">
            {status === 'ready' && '就绪'}
            {status === 'submitted' && '已发送…'}
            {status === 'streaming' && '生成中…'}
            {status === 'error' && '出错'}
          </span>
          <button type="submit" disabled={!canSend}>
            发送
          </button>
        </div>
      </form>
    </div>
  )
}
