import { createCodePlugin } from '@streamdown/code'
import { mermaid } from '@streamdown/mermaid'
import { Streamdown, type ThemeInput } from 'streamdown'
import 'streamdown/styles.css'
import './StreamdownText.css'

const shikiTheme: [ThemeInput, ThemeInput] = ['github-light', 'github-dark']

const codePlugin = createCodePlugin({ themes: shikiTheme })

export type StreamdownTextProps = {
  children: string
  /** 助手最后一段文本在流式输出时为 true，用于 Streamdown 动画与未闭合 Markdown */
  isStreaming?: boolean
}

export function StreamdownText({
  children,
  isStreaming = false,
}: StreamdownTextProps) {
  return (
    <div className="chat-streamdown">
      <Streamdown
        mode="streaming"
        isAnimating={isStreaming}
        parseIncompleteMarkdown
        shikiTheme={shikiTheme}
        plugins={{ mermaid, code: codePlugin }}
        className="chat-streamdown__inner"
      >
        {children}
      </Streamdown>
    </div>
  )
}
