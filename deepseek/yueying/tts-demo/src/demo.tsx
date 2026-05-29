import React, { useRef } from 'react';

export default function App() {
  // 使用 useRef 创建一个引用，指向 audio 元素
  const audioPlayer = useRef(null);

  // 定义一个函数用于播放音频
  const playAudio = () => {
    if (audioPlayer.current) {
      audioPlayer.current.play();
    }
  };

  return (
    <div>
      {/* Audio 元素不会直接显示在页面上 */}
      <audio ref={audioPlayer} src="/sounds/tom.wav"></audio>

      {/* 按钮点击时播放音频 */}
      <button onClick={playAudio}>播放声音</button>
    </div>
  );
}