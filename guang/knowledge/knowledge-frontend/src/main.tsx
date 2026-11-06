import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { 
  // 引入全局配置提供器
  // 用于配置 antd 组件库的全局样式
  // 例如：颜色、字体、间距、语言包等  国际化
  ConfigProvider, 
  // 引入 antd 应用组件
  // 用于包裹应用组件，提供全局应用上下文
  // message/modal/notification
  App as AntdApp 
} from 'antd'
import zhCN from 'antd/locale/zh_CN'

createRoot(document.getElementById('root')!).render(
  <ConfigProvider
      locale={zhCN}
      // 配置主题
      // 例如：颜色、字体、间距、圆角等
      theme={{
        // 主题配置
        // `theme.token` 是 antd 的**设计令牌**，存放主题基础样式变量（主色、圆角等）
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 6,
        },
      }}
    >
      <AntdApp>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>,
)
