import {
  useState,
  useEffect
} from 'react';
import api from '../api';

export default function Home() {
  const [repos, setRepos] = useState([]);
  useEffect(() => {
    api.get('/users/shunwuyu/repos').then((res) => {
      setRepos(res.data);
    });
  }, []);
  return (
    <div>
      <h1>Home Page</h1>
      {
        repos.length ? (<ul>
        {repos.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
        </ul>): (
        <p>No repos found</p>
        )
      }
      
    </div>
  );
}