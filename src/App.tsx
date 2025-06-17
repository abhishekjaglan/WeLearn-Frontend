import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Summarize from './pages/Summarize';

export type Page = 'dashboard' | 'summarize';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('dashboard');

  return (
    <div>
      <Navbar setPage={setPage} />
      {page === 'dashboard' ? <Dashboard setPage={setPage} /> : <Summarize />}
    </div>
  );
};

export default App;