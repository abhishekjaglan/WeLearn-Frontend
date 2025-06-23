import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Summarize from './components/Summarize';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'summarize'>('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="pt-20">
        {activeTab === 'dashboard' ? <Dashboard /> : <Summarize />}
      </main>
    </div>
  );
}

export default App
