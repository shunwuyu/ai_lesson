import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useRepos from '../hooks/useRepos';
import Loading from '../components/Loading';
import Error from '../components/Error';
import RepoCard from '../components/RepoCard';

function RepoList() {
  const { id } = useParams();
  const { repos, loading, error } = useRepos(id);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div>
      <h2>Repositories for {id}</h2>
      {repos.map((repo) => (
        <Link key={repo.id} to={`/users/${id}/repos/${repo.name}`}>
          <RepoCard repo={repo} />
        </Link>
      ))}
    </div>
  );
}

export default RepoList;