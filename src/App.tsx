import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UserInfo from './pages/UserInfo';
import { WELEARN_ROUTES } from './utils/welearn-constants';
import './App.css';
import './styles/welearn-core.css';

function App() {
  return (
    <Router>
      <div className="wl-app">
        <Routes>
          <Route path={WELEARN_ROUTES.LANDING} element={<LandingPage />} />
          <Route path={WELEARN_ROUTES.HOME} element={<Home />} />
          <Route path={WELEARN_ROUTES.SIGN_IN} element={<SignIn />} />
          <Route path={WELEARN_ROUTES.SIGN_UP} element={<SignUp />} />
          <Route path={WELEARN_ROUTES.USER_INFO} element={<UserInfo />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;