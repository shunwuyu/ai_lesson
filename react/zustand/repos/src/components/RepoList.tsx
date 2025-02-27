// src/components/RepoList.tsx
import React, { useEffect } from 'react';
import { useReposStore } from '../store/reposStore';

const RepoList: React.FC = () => {
  const { repos, loading, error, fetchRepos } = useReposStore();

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Repositories</h1>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
            <p>{repo.description || 'No description provided.'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;