// src/pages/Pay.jsx
import { useEffect, useState } from 'react';
import {
  getProtected
} from '../api/index'
// import request from '../utils/request';
import { useAuthStore } from '../store/user';

export default function Pay() {
  const [data, setData] = useState(null);
  const logout = useAuthStore(state => state.logout);

  useEffect(() => {
    async function fetchData() {
      const res = await getProtected();
      console.log(res);
      if (res.code === 0) {
        setData(res.data);
      } 
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Pay Page</h2>
      {data ? <p>Welcome, {data}</p> : <p>Loading...</p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
