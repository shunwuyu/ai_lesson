import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loading from './components/Loading';
import RepoList from './pages/RepoList';

const RepoDetail = lazy(() => import('./pages/RepoDetail'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/users/:id/repos" element={<RepoList />} />
        <Route path="/users/:id/repos/:repoId" element={<RepoDetail />} />
        <Route path="*" element={<Navigate to="/users/shunwuyu/repos" />} />
      </Routes>
    </Suspense>
  );
}

export default App;