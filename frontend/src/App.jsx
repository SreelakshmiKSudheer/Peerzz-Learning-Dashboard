import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Layout from './layout/Layout';
import PublicHome from './pages/PublicHome';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AdminDashboard from './pages/AdminDashboard';
import EducatorDashboard from './pages/EducatorDashboard';
import LearnerDashboard from './pages/LearnerDashboard';
import EducatorSignUp from './pages/EducatorSignUp';
import CourseCreation from './pages/CourseCreation';
import Profile from './pages/Profile';
import Users from './pages/Users';
import SingleUser from './pages/SingleUser';


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicHome />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/educator-dashboard" element={<EducatorDashboard />} />
          <Route path="/learner-dashboard" element={<LearnerDashboard />} />
          <Route path="/course/create" element={<CourseCreation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<Users />} />
          <Route path="/admin/users/user/:userId" element={<SingleUser />} />      
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/register-teacher" element={<EducatorSignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
