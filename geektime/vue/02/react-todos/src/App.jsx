import React, { useState, useMemo } from "react";

/**
 * TodoApp - 一个简单的待办项组件（React 版本）
 */
export default function App() {
  // 相当于 Vue 的 ref("other")
  const [other, setOther] = useState("other");

  // 相当于 Vue 的 ref('极客时间')
  const [title, setTitle] = useState("极客时间");

  // todos 用数组对象表示，每项有 id, title, done
  const [todos, setTodos] = useState([
    { id: 1, title: "吃饭", done: false },
    { id: 2, title: "睡觉", done: true },
  ]);

  // 计算未完成数量（类似 Vue 的 computed active）
  const active = useMemo(
    () => todos.filter((t) => !t.done).length,
    [todos]
  );

  // 计算总数（类似 Vue 的 computed all）
  const all = useMemo(() => todos.length, [todos]);

  // 添加 todo（回车时调用）
  const addTodo = () => {
    const trimmed = title.trim();
    if (!trimmed) return; // 不添加空字符串
    // 生成简单唯一 id（生产可用更稳健的 id 方案）
    const newTodo = {
      id: Date.now() + Math.random(),
      title: trimmed,
      done: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setTitle(""); // 清空输入
  };

  // 切换单个 todo 的完成状态（v-model="todo.done" 的对应）
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  // 全选 / 反选：用 getter（allDone） + setter（setAllDone）
  const allDone = useMemo(() => active === 0 && all > 0, [active, all]);
  const setAllDone = (val) => {
    setTodos((prev) => prev.map((t) => ({ ...t, done: Boolean(val) })));
  };

  // 清除已完成项（clear）
  const clear = () => {
    setTodos((prev) => prev.filter((t) => !t.done));
  };

  // 回车事件处理（input @keydown.enter="addTodo" 的对应）
  const onTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", lineHeight: 1.6 }}>
      {/* other 输入演示（和 Vue 模板一样） */}
      <div>
        {other}
        <input
          type="text"
          value={other}
          onChange={(e) => setOther(e.target.value)}
        />
      </div>

      {/* title 输入（用于新建 todo） */}
      <div style={{ marginTop: 12 }}>
        {title}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={onTitleKeyDown}
          placeholder="输入新待办后按回车添加"
        />
        <button onClick={addTodo}>
          添加
        </button>
      </div>

      {/* todo 列表：注意用 todo.id 作为 key */}
      <div>
        {todos.length > 0 ? (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span
                  style={{
                    // done 的样式（和你 Vue 的 .done 一致）
                    color: todo.done ? "gray" : "inherit",
                    textDecoration: todo.done ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div>暂无待办事项</div>
        )}
      </div>

      {/* 统计与全选、清理 */}
      <div>
        {active} / {all}
      </div>

      <div>
        全选
        <input
          type="checkbox"
          // checkbox 的 checked 对应 computed getter
          checked={allDone}
          // 切换时调用 setter
          onChange={(e) => setAllDone(e.target.checked)}
        />
        {/* 当存在已完成项时显示清理按钮（Vue: v-if="active<all"） */}
        {active < all && (
          <button onClick={clear}>
            清理
          </button>
        )}
      </div>
    </div>
  );
}
