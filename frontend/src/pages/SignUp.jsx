import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import API from '../api';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('learner'); // Default to learner
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setError('');
    setLoading(true);

    try {
      if (role === 'educator') {
        // For educators, store data and redirect to register-teacher
        sessionStorage.setItem('educatorSignUpData', JSON.stringify({
          name,
          email,
          password
        }));
        navigate('/register-teacher');
      } else {
        // For learners, directly register
        const res = await API.post('/auth/register/:learner', {
          name,
          email,
          password
        });

        if (res.data && res.data.token) {
          const { token, user } = res.data;
          
          // Save token and user data
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          
          // Use context login function instead of localStorage
          login(token, user);

          // Redirect to learner dashboard
          navigate('/learner-dashboard');
        } else {
          setError('Registration failed. Please try again.');
        }
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Registration failed');
      } else {
        setError('Network error. Please try again.');
      }
      console.error('SignUp error:', err);
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
          <h2 className="mb-6 text-center text-3xl font-bold text-[var(--quad)]">Sign Up</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--quad)] mb-2">
              I am a:
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="learner"
                  checked={role === 'learner'}
                  onChange={e => setRole(e.target.value)}
                  className="mr-2"
                />
                <span className="text-[var(--quad)]">Learner</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="educator"
                  checked={role === 'educator'}
                  onChange={e => setRole(e.target.value)}
                  className="mr-2"
                />
                <span className="text-[var(--quad)]">Educator</span>
              </label>
            </div>
          </div>

          {/* Name Entry */}
          <div className="mb-4">
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-5 py-2 bg-[var(--bi)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--quad)]"
              placeholder='Full Name'
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-5 py-2 bg-[var(--bi)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--quad)]"
              placeholder='Email ID'
              required
              disabled={loading}
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
              disabled={loading}
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full px-5 py-2 bg-[var(--bi)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--quad)]"
              required
              placeholder='Confirm Password'
              disabled={loading}
            />
          </div>
          <div className='mb-4 text-center w-full'>Already have an account? <a href="/login" className="text-[var(--quad)]">Login</a></div>
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-[var(--quad)] text-white font-bold hover:bg-[var(--quad-dark)] transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Processing...' : (role === 'educator' ? 'Next' : 'Sign Up')}
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

export default SignUp;