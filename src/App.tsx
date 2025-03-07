import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import UserPage from './pages/UserPage';
import Landing from './pages/Landing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user" element={<UserPage />} />
        {/* <Route path="/home" element={<div>Home Placeholder</div>} />
        <Route path="/home/documents" element={<div>Documents Placeholder</div>} />
        <Route path="/home/urls" element={<div>URLs Placeholder</div>} />
        <Route path="/home/audio" element={<div>Audio Placeholder</div>} />
        <Route path="/home/video" element={<div>Video Placeholder</div>} />
        <Route path="/user" element={<div>User Placeholder</div>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;