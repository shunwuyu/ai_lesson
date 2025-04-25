// App.js
import React, { Suspense } from 'react';
import { fetchRepos } from './api';
import RepoList from './RepoList.jsx';

const resource = fetchRepos();

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading repositories...</div>}>
        <RepoList resource={resource} />
      </Suspense>
    </div>
  );
}

export default App;