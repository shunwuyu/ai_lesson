import { useState } from 'react'
import './App.css'
import Box from './components/Box'
import FadeBox from './components/FadeBox'
import MotionBox from './components/MotionBox'
import Swiper from './components/Swiper'
function App() {
  const data = [
  {
    id: 1,
    pic: 'https://img.36krcdn.com/hsossms/20250721/v2_bc145f85fb1b4f5fa536bb2a004160d7@000000@ai_oswg233482oswg1536oswg722_img_000~tplv-1marlgjv7f-ai-v3:960:400:960:400:q70.jpg?x-oss-process=image/format,webp',
    title: '迟到七年的折叠屏 iPhone，是「最不苹果」的苹果产品',
  },
  {
    id: 2,
    pic: 'https://img.36krcdn.com/hsossms/20250721/v2_4c5ca088ab3d495f8ede2c21f3d75c2c@5091053@ai_oswg915518oswg1053oswg495_img_png~tplv-1marlgjv7f-ai-v3:960:400:960:400:q70.jpg?x-oss-process=image/format,webp',
    title: '翻阅一千条外卖大战评论，消费者“多吃一顿饭”了吗？',
  },
];
  return (
    <>
      <div style={{ maxWidth: '100%', margin: '0 auto' }}>
        <Swiper slides={data} />
      </div>
      <Box />
      <FadeBox />
      <MotionBox />

    </>
  )
}

export default App
