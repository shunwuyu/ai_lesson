import { useState } from 'react'
import DOMPurify from 'dompurify';
import './App.css'

// function App() {
//   // React 不允许直接在 JSX 中插入 HTML 字符串，因为这可能会导致 XSS（跨站脚本攻击）
//   const content = "<div>Hello World</div>";
//   return (
//     <>
//       {content}
//     </>
//   )
// }

// function App() {
//   // React 不允许直接在 JSX 中插入 HTML 字符串，因为这可能会导致 XSS（跨站脚本攻击）
//   const content = "<div>Hello World</div>";
//   return (
//     // 用于直接插入 HTML 字符串到组件中，但需谨慎使用以避免 XSS 攻击风险。
//     <div dangerouslySetInnerHTML={{__html: content}} />
//   )
// }

// function App() {
//   // React 不允许直接在 JSX 中插入 HTML 字符串，因为这可能会导致 XSS（跨站脚本攻击）
//   const content = "<script>alert('友商是傻逼')</script>";

//   return (
//     // 用于直接插入 HTML 字符串到组件中，但需谨慎使用以避免 XSS 攻击风险。
//     <div dangerouslySetInnerHTML={{__html: content}} />
//   )
// }

function App() {
  // React 不允许直接在 JSX 中插入 HTML 字符串，因为这可能会导致 XSS（跨站脚本攻击）
  const content = "ddfd<script>alert('友商是傻逼')</script>ddd</script>";
  const cleanHtml = DOMPurify.sanitize(content);
  return (
    // 用于直接插入 HTML 字符串到组件中，但需谨慎使用以避免 XSS 攻击风险。
    <div dangerouslySetInnerHTML={{__html: cleanHtml}} />
  )
}

export default App
