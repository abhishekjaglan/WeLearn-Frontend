import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import Dashboard from './pages/Dashboard';
import Summarize from './pages/Summarize';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/summarize" element={<Summarize />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
