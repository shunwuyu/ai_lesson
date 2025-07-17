import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRepoDetail } from '../api/github';
import Loading from '../components/Loading';
import Error from '../components/Error';

function RepoDetail() {
  const { id, repoId } = useParams();
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRepoDetail(id, repoId)
      .then((res) => {
        setRepo(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id, repoId]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div>
      <h2>{repo.full_name}</h2>
      <p>{repo.description}</p>
      <p>⭐ Stars: {repo.stargazers_count}</p>
      <p>🍴 Forks: {repo.forks_count}</p>
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">View on GitHub</a>
    </div>
  );
}

export default RepoDetail;