import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
// import Home from './pages/Home';
// import UserPage from './pages/UserPage';
import Landing from './pages/Landing';
// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from './store';
// import { PrivateRouteProps } from './types';
import Dashboard from './pages/Dashboard';
import DocumentsView from './pages/DocumentsView';
import URLsView from './pages/URLsView';
import AudioView from './pages/AudioView';
import VideoView from './pages/VideoView';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
//   // Use useSelector with RootState to type the Redux state
//   const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
//   return isAuthenticated ? element : <Navigate to="/signin" replace />;
// };

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<Landing />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/" element={<PrivateRoute element={<Dashboard />} />} /> */}
        {/* <Route path="/home/documents" element={<PrivateRoute element={<DocumentsView />} />} />
        <Route path="/home/urls" element={<PrivateRoute element={<URLsView />} />} />
        <Route path="/home/audio" element={<PrivateRoute element={<AudioView />} />} />
        <Route path="/home/video" element={<PrivateRoute element={<VideoView />} />} /> */}
        <Route path='/' element={<Dashboard />} />
        <Route path="/home" element={<Home  />}/>
        <Route path="/documents" element={<DocumentsView />} />
        <Route path="/urls" element={<URLsView />} />
        <Route path="/audio" element={<AudioView />} />
        <Route path="/video" element={<VideoView />} />  
        <Route path="/user" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;