"use client";
// src/app/page.tsx
import React, { useState } from "react";

export default function Home() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      {/* 主标题：点击后淡入 */}
      <h1
        className={`text-4xl font-bold text-blue-600 mb-8 transition-all duration-1000 ${
          isClicked ? "animate-fadeIn" : ""
        }`}
      >
        欢迎来到动画世界！
      </h1>

      {/* 按钮：点击后弹跳 */}
      <button
        onClick={() => setIsClicked(true)}
        disabled={isClicked}
        className={`px-8 py-4 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-transform ${
          isClicked ? "animate-bounce" : ""
        }`}
        style={{
          animationDuration: "1s",
          animationIterationCount: "3", // 只执行3次弹跳
        }}
      >
        {isClicked ? "已点击！🎉" : "点我触发动画"}
      </button>

      {/* 🔥 新增：点击后从底部滑入 + 放大 + 渐显 的卡片 */}
      
        <div
          className="mt-10 text-center animate__animated animate-slide-in-up animate-duration-700 animate-ease-out"
          style={{ '--animate-duration': '0.7s' } as React.CSSProperties}
        >
          <div className="bg-white border-l-4 border-yellow-400 text-yellow-700 p-6 rounded-lg shadow-xl transform animate__animated animate__pulse animate__infinite inline-block">
            <p className="text-lg font-medium">
              🎉 动画已触发！这是一条带 <span className="font-bold">滑入 + 脉冲闪烁</span> 效果的消息！
            </p>
          </div>
        </div>
      
    </div>
  );
}