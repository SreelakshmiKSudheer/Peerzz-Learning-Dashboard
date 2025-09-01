import React, { useEffect, useState } from 'react';
import API from '../api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user); // <-- Use res.data.user, not res.data
        //console.log(res.data.user);
      } catch (err) {
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="border border-[var(--tri)] bg-[var(--bi)] rounded-lg p-8 m-10 shadow">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {user ? (
        <div>
          <div className='flex mb-2'>
            <label className='w-[15%]'>Name: </label>
            <p>{user.name}</p>
          </div>
          <div className='flex mb-2'>
            <label className='w-[15%]'>Email: </label>
            <p>{user.email}</p>
          </div>
          <div className='flex mb-2'>
            <label className='w-[15%]'>Role: </label>
            <p>{user.role}</p>
          </div>
          {user.role === 'educator' && (
            <div>
              <div className='flex mb-2'>
                <label className='w-[15%]'>Designation: </label>
                <p>{user.designation}</p>
              </div>
              <div className='flex mb-2'>
                <label className='w-[15%]'>Institution: </label>
                <p>{user.institution.name}</p>
              </div>
            </div>
          )}
          <div className='flex mb-2'>
            <label className='w-[15%]'>Joined: </label>
            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      ) : (
        <div>No user data found.</div>
      )}
    </div>
  );
};

export default Profile;