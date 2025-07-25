import { React, useState } from 'react';
import API from '../api'; // Make sure the path to api.js is correct
import { useNavigate } from 'react-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await API.post('/auth/login', { email, password });

      // For Axios, successful responses are in res.data
      // No need to check res.ok (that's for fetch API)
      if (res.data && res.data.token) {
        const { token, user } = res.data;

        // Save token and user data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect based on user role
        switch (user.role) {
          case 'coordinator':
            navigate('/admin-dashboard');
            break;
          case 'educator':
            navigate('/educator-dashboard');
            break;
          case 'learner':
            navigate('/learner-dashboard');
            break;
          default:
            navigate('/');
        }
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      // Handle API errors
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Login failed');
      } else {
        setError('Network error. Please try again.');
      }
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex h-screen bg-[var(--uni)]">
      <div className="flex-1 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-100 rounded-lg "
        >
          <h2 className="mb-6 text-center text-3xl font-bold text-[var(--quad)]">Login</h2>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-5 py-2 bg-[var(--bi)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--quad)]"
              placeholder='Email ID'
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-5 py-2 bg-[var(--bi)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--quad)]"
              required
              placeholder='Password'
            />
          </div>

          <div className='mb-4 text-center w-full'>Don't have an account? <a href="/register" className="text-[var(--quad)]">Sign Up</a></div>
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-[var(--quad)] text-white font-bold hover:bg-[var(--quad-dark)] transition"
          >
            Login
          </button>
        </form>
      </div>
      <div className="flex-1 bg-[var(--uni)]">
        <div className="mx-w-md mx-auto h-full flex flex-col items-center justify-center">
          <h1 className='text-[var(--quad)] text-7xl font-bold mb-3'>Peer<span className='text-[#FBC923]'>zz</span></h1>
          <h2 className='text-[var(--tri)] text-lg font-semibold mb-6'>Make your learning easy, career bright</h2>
          <div className="flex items-center justify-center w-[60%] h-[60%]">
            <img src="/peerzzz.svg" alt="SignUp Illustration" className="object-cover " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;