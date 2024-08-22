import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import { Dashboard } from './pages/Dashboard';
import Profile from './pages/Profile';
import PostComments from './pages/PostComments';
import { UsersPosts } from './pages/UsersPosts';
import { ProtectedRoute } from './components/ProtectedRoutes';
import PageNotFoundError from './components/PageNotFoundError';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:postId" element={<PostComments />} />
          <Route path="/user-posts/" element={<UsersPosts />} />
        </Route>
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="*" element={<PageNotFoundError />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
