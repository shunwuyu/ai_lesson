import './App.css'
import React, { useState, useRef } from 'react'
// 自定义组件必须大写
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    // 这里可以添加登录逻辑，例如调用 API
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Click Me</button>
    </form>
  );
};
// 受控组件
// 表单元素的值由组件的状态管理，输入变化通过
// 事件处理器更新状态，确保 UI 和数据的一致性。
function MyForm() {
  const [value, setValue] = useState('');
  return (
    <input value={value} onChange={e => setValue(e.target.value)} />
  );
}
// 非受控组件
function ControlledForm() {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Input value:', inputRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}
// 非受控组件是指在 React 中不使用状态来管理输入值，而是直接通过 DOM 元素来获取输入值。
function UnControlledForm() {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Input value:', inputRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}



const UserCard = ({ user }) => {

  return (
    <div className="user-card">
      <img src={user.avatar} alt={`${user.name}'s avatar`} />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
      <button onClick={() => alert(`Hello, ${user.name}!`)}>Greet</button>
      
    </div>
  );
};

const AComponent = () => <div>This is Component A</div>;
const BComponent = () => <div>This is Component B</div>;

// 主组件
const DynamicComponent = ({ type }) => {
  const components = { a: AComponent, b: BComponent };
  const Tag = components[type];

  return (
    <div>
      {Tag ? <Tag /> : <div>Component not found</div>}
    </div>
  );
};


function App() {
  const element = <h1>Hello, world!</h1>;
  const element2 = React.createElement('h1', null, '你好，世界!');
  const isValid = true;
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const toggleLogin = () => {
    setIsLoggedIn((prev) => !prev);
  };
  // 支持 JS 表达式
  const names = ["Alice", "Bob", "Charlie"];
  const user = {
    name: "Alice",
    bio: "Web Developer",
    avatar: "https://example.com/avatar.jpg",
  };
  
  return (
    // JSX 中必须有单一根节点
    // <h1>Hello</h1>
    //  <p>World</p>
    // 使用 Fragment 代替额外的 DOM
    <>
    
    <ControlledForm/>
    <UnControlledForm/>
    <LoginForm />
     {element}
     {element2}
     {names.length > 0 ? (
      names.map((name) => <h1 key={name}>{name}</h1>)
    ) : (
      <h1>No names available</h1>
    )}
    <UserCard user={user} />
    {isValid && <span>Valid</span>}
    {isLoggedIn ? <div >Logout</div> : <div>Login</div>}
    <button onClick={toggleLogin}>
        {isLoggedIn ? 'Switch to Login' : 'Switch to Logout'}
    </button>
    动态组件
      <DynamicComponent type="a" />
      <DynamicComponent type="b" />
    </>
  )
}

export default App
