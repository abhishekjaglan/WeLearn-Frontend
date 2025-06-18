import { useState } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Summarize from './pages/Summarize'

export type Page = 'dashboard' | 'summarize'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  return (
    <div className="min-h-screen bg-white">
      <Navbar setPage={setCurrentPage} />
      {currentPage === 'dashboard' ? (
        <Dashboard setPage={setCurrentPage} />
      ) : (
        <Summarize />
      )}
    </div>
  )
}

export default App