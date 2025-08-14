import { useState } from 'react'
import './App.css'

// 都可以定义对象结构


// 使用 interface
interface User {
  name: string;
  age: number;
  avatarUrl: string;
}

interface UserCardProps {
  user: User;
  onEdit: (id: number) => void; // 编辑回调
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
  return (
    <div>
      <img src={user.avatarUrl} alt="avatar" />
      <h2>{user.name}</h2>
      <p>Age: {user.age}</p>
      <button onClick={() => onEdit(1)}>Edit</button>
    </div>
  );
};

function App() {
  const user = {
    avatarUrl:'dd',
    name: 'dd',
    age: 22
  }
  const editUser = (id: number) => {

  } 
  return (
    <>
      <UserCard user={user} onEdit={editUser}/>
    </>
  )
}

export default App
