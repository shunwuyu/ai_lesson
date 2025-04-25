// RepoList.js
function RepoList({ resource }) {
    const repos = resource.read();
  
    return (
      <div className="repo-list">
        <h2>GitHub Repositories</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {repos.map(repo => (
            <li key={repo.id} style={{
              border: '1px solid #eee',
              margin: '10px 0',
              padding: '15px',
              borderRadius: '5px'
            }}>
              <h3>{repo.name}</h3>
              <p>{repo.description || 'No description'}</p>
              <div style={{ display: 'flex', gap: '20px' }}>
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  export default RepoList;