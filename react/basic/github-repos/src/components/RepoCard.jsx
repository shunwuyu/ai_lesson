import React from 'react';

function RepoCard({ repo }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
      <h3>{repo.name}</h3>
      <p>{repo.description}</p>
    </div>
  );
}

export default RepoCard;