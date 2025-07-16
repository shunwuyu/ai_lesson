import { useState, useRef } from 'react'
import './App.css'


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



function App() {
  
  return (
    <>
      
    </>
  )
}

export default App
