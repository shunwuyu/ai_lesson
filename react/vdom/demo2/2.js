import React, { useState } from "react";
// UI 在某个状态下，它应该长什么样
// React 拿着你的 声明式描述，自动计算出“最小更新”，然后去操作真实 DOM。
// 写组件 = 描述 UI 应该是什么
// 使用状态（state）驱动视图
// 不用手动操作、更新、删除、插入 DOM
// VDOM是声明式UI的基石，它让开发者只关心状态，由框架高效同步到真实DOM。
function ToggleButton() {
  const [isOn, setIsOn] = useState(false);

  // 👇 你看！你只描述：UI 应该是什么！
  return (
    <button
      onClick={() => setIsOn(!isOn)}
      style={{
        backgroundColor: isOn ? "green" : "gray",
        color: isOn ? "white" : "black",
        padding: "10px 20px",
        border: "none",
        borderRadius: "4px"
      }}
    >
      {isOn ? "开" : "关"}
    </button>
  );
}