import { useState, useCallback } from 'react';

function useFetch(username) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    console.log('////////')
    if (!username) return;
    setLoading(true);
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setRepos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [username]); // 当 username 改变时重新创建 fetchData 函数

  return { repos, loading, error, fetchData };
}

export default useFetch;