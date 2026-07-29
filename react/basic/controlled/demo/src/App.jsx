import { useState, useRef } from 'react'
import './App.css'
import LoginForm from './Login'

// 受控组件：表单输入的值由 React state 控制，
// 变更必须通过 onChange 更新 state，视图完全依附状态。
function ControlledInput() {
  const [value, setValue] = useState("");

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
// useRef：创建一个可变容器，值变更不会触发组
// 件重渲染，常用来持有 DOM 元素或持久保存变量。
function UncontrolledInput() {
  const inputRef = useRef(null);

  const handleClick = () => {
    alert(inputRef.current.value);
  };

  return (
    <>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>获取输入值</button>
    </>
  );
}

// 一个评论表单（用非受控）
function CommentBox() {
  const textareaRef = useRef(null);

  const handleSubmit = () => {
    const comment = textareaRef.current.value;
    if (!comment) return alert("评论不能为空");
    console.log("提交评论：", comment);
  };

  return (
    <div>
      <textarea ref={textareaRef} placeholder="输入评论..." />
      <button onClick={handleSubmit}>提交</button>
    </div>
  );
}

// 一个注册表单（用受控）

function RegisterForm() {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.username || !form.password) return alert("请完整填写表单");
    console.log("注册信息：", form);
  };

  return (
    <div>
      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="用户名"
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="密码"
      />
      <button onClick={handleSubmit}>注册</button>
    </div>
  );
}


function Demo() {
  const countRef = useRef(0)
  const [renderNum, setRenderNum] = useState(0)

  const addRef = () => {
    countRef.current++
    console.log(countRef.current)
  }

  const triggerRender = () => setRenderNum(v => v + 1)

  return (
    <div>
      <p>渲染次数：{renderNum}</p>
      <button onClick={addRef}>修改ref.current（不会刷新页面）</button>
      <button onClick={triggerRender}>触发重渲染</button>
    </div>
  )
}


function App() {
  
  return (
    <>
      {/* <ControlledInput/>
      <UncontrolledInput />
      <CommentBox/>
      <RegisterForm /> */}
      <Demo />
      <LoginForm/>
    </>
  )
}

export default App
