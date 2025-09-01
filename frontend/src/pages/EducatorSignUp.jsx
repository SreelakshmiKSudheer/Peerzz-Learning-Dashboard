import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import API from '../api';
import Hero from '../components/Hero';

const EducatorSignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [designation, setDesignation] = useState('');
  const [institution, setInstitution] = useState('');
  const [institutionMainId, setInstitutionMainId] = useState('');
  const [expertise, setExpertise] = useState('');

  useEffect(() => {
    // Retrieve email and password from sessionStorage
    const educatorData = sessionStorage.getItem('educatorSignUpData');
    if (educatorData) {
      const { name: storedName, email: storedEmail, password: storedPassword } = JSON.parse(educatorData);
      setName(storedName);
      setEmail(storedEmail);
      setPassword(storedPassword);
    } else {
      // If no data found, redirect back to signup
      navigate('/register');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await API.post('/auth/register/:educator', {
        name,
        email,
        password,
        designation,
        institution,
        institutionMainId,
        expertise
      });

      if (res.data && res.data.token) {
        const { token, user } = res.data;
        
        // Save token and user data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Clear sessionStorage
        sessionStorage.removeItem('educatorSignUpData');
        
        // Redirect to educator dashboard
        navigate('/educator-dashboard');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Registration failed');
      } else {
        setError('Network error. Please try again.');
      }
      console.error('Educator SignUp error:', err);
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
                <h2 className='font-semibold text-[var(--tri)] mb-4 text-center'>Complete your teaching profile to continue </h2>

                {/* Show email (read-only) */}
                <div className="mb-4">
                    <input
                        type="email"
                        value={email}
                        className="w-full px-5 py-2 bg-gray-100 rounded focus:outline-none"
                        placeholder='Email'
                        disabled
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        id="designation"
                        value={designation}
                        onChange={e => setDesignation(e.target.value)}
                        className="w-full px-5 py-2 bg-[var(--bi)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--quad)]"
                        placeholder='Designation'
                        required
                        disabled={loading}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        id="institution"
                        value={institution}
                        onChange={e => setInstitution(e.target.value)}
                        className="w-full px-5 py-2 bg-[var(--bi)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--quad)]"
                        placeholder='Institution'
                        required
                        disabled={loading}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        id="institutionMainId"
                        value={institutionMainId}
                        onChange={e => setInstitutionMainId(e.target.value)}
                        className="w-full px-5 py-2 bg-[var(--bi)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--quad)]"
                        placeholder='Institution Main ID'
                        required
                        disabled={loading}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        id="expertise"
                        value={expertise}
                        onChange={e => setExpertise(e.target.value)}
                        className="w-full px-5 py-2 bg-[var(--bi)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--quad)]"
                        placeholder='Expertise / Domain'
                        required
                        disabled={loading}
                    />
                </div>
                <div className='mb-4 text-center w-full'>Already have an account? <a href="/login" className="text-[var(--quad)]">Login</a></div>
                <button
                    type="submit"
                    className="w-full bg-[var(--quad)] text-white py-2 rounded hover:bg-[var(--tri)] transition-colors duration-200"
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Sign Up'}
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
}

export default EducatorSignUp;